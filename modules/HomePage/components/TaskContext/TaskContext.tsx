import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useClearCompletedTasksMutation } from "@/shared/redux/rtk-apis/apiSlice";
import { EFilterPriority, EFilterStatus, ITask, ITasksContext } from "./TaskContext.types";

const TasksContext = createContext<ITasksContext | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

const saveTasksToLocalStorage = (tasks: ITask[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

const loadTasksFromLocalStorage = (): ITask[] => {
  if (typeof window !== "undefined") {
    const tasks = localStorage.getItem("tasks");
    if (!tasks) return [];
    try {
      const parsedTasks: ITask[] = JSON.parse(tasks);
      return parsedTasks.map((task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      }));
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      return [];
    }
  }
  return [];
};

const sortTasks = (tasks: ITask[]): ITask[] => {
  const priorityOrder: { [key in EFilterPriority]: number } = {
    [EFilterPriority.High]: 1,
    [EFilterPriority.Medium]: 2,
    [EFilterPriority.Low]: 3,
    [EFilterPriority.All]: 4,
  };
  const sortedTasks = [...tasks];

  return sortedTasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[a.priority as unknown as EFilterPriority] - priorityOrder[b.priority as unknown as EFilterPriority];
  });
};


const filterTasks = (
  tasks: ITask[],
  filterStatus: EFilterStatus,
  filterPriority: EFilterPriority,
  filterDueDate: Date | null
): ITask[] => {
  return tasks.filter((task) => {
    const statusMatch =
      filterStatus === EFilterStatus.All ||
      (filterStatus === EFilterStatus.Active ? !task.completed : task.completed);

    const priorityMatch =
      filterPriority === EFilterPriority.All || (task.priority as unknown as EFilterPriority) === filterPriority;

    const dueDateMatch =
      filterDueDate === null || (task.dueDate && task.dueDate <= filterDueDate);

    return statusMatch && priorityMatch && dueDateMatch;
  });
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const {data: fetchedTasks} = useGetTasksQuery();

  const [createTask] = useCreateTaskMutation();

  const [updateTask] = useUpdateTaskMutation();

  const [clearCompletedTasksMutation] = useClearCompletedTasksMutation();

  const [filterStatus, setFilterStatus] = useState<EFilterStatus>(EFilterStatus.All);

  const [filterPriority, setFilterPriority] = useState<EFilterPriority>(EFilterPriority.All);

  const [filterDueDate, setFilterDueDate] = useState<Date | null>(null);

  const [history, setHistory] = useState<ITask[][]>([]);

  const [redoStack, setRedoStack] = useState<ITask[][]>([]);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToLocalStorage(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if(fetchedTasks){
      setTasks(sortTasks(fetchedTasks));
    }
  }, [fetchedTasks]);

  const saveHistoryState = () => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
  };

  const addTask = async (task: Omit<ITask, "id" | "completed">) => {
    try {
      const result = await createTask(task).unwrap();
      const newTask = { ...result, completed: false };
      setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
      saveHistoryState();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    saveHistoryState();
  };

  const editTask = async (updatedTask: ITask) => {
    try {
      const result = await updateTask(updatedTask).unwrap();
      setTasks((prevTasks) =>
        sortTasks(
          prevTasks.map((task) =>
            task.id === result.id ? result : task
          )
        )
      );
      saveHistoryState();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const toggleTaskCompletion = async (id: number) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        const result = await updateTask(updatedTask).unwrap();
        setTasks((prevTasks) =>
          sortTasks(
            prevTasks.map((task) =>
              task.id === result.id ? result : task
            )
          )
        );
        saveHistoryState();
      }
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const filteredTasks = filterTasks(
    tasks,
    filterStatus,
    filterPriority,
    filterDueDate
  );

  const clearCompletedTasks = async () => {
    try {
      await clearCompletedTasksMutation().unwrap();
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
      saveHistoryState();
    } catch (error) {
      console.error("Failed to clear completed tasks:", error);
    }
  };

  const undoLastAction = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setTasks(previousState);
      setHistory(history.slice(0, -1));
      setRedoStack((prevRedoStack) => [...prevRedoStack, tasks]);
    }
  };

  const redoLastAction = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setHistory((prevHistory) => [...prevHistory, tasks]);
      setTasks(nextState);
      setRedoStack(redoStack.slice(0, -1));
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        deleteTask,
        editTask,
        toggleTaskCompletion,
        setFilterStatus,
        setFilterPriority,
        setFilterDueDate,
        clearCompletedTasks,
        undoLastAction,
        redoLastAction,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
