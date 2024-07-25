import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  return tasks.sort((a, b) => {
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
    const loadedTasks = loadTasksFromLocalStorage();
    setTasks(sortTasks(loadedTasks));
  }, []);

  const saveHistoryState = () => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
  };

  const addTask = (task: Omit<ITask, "id" | "completed">) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
    saveHistoryState();
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    saveHistoryState();
  };

  const editTask = (updatedTask: ITask) => {
    setTasks((prevTasks) =>
      sortTasks(
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      )
    );
    saveHistoryState();
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      sortTasks(
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    );
    saveHistoryState();
  };

  const filteredTasks = filterTasks(
    tasks,
    filterStatus,
    filterPriority,
    filterDueDate
  );

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    saveHistoryState();
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
