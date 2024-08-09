import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { useGetTasksQuery } from "@/shared/redux/rtk-apis/apiSlice";

import {
  EFilterPriority,
  EFilterStatus,
  ITask,
  ITasksContext,
} from "./TaskContext.types";

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

export const sortTasks = (tasks: ITask[]): ITask[] => {
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
    return (
      priorityOrder[a.priority as unknown as EFilterPriority] -
      priorityOrder[b.priority as unknown as EFilterPriority]
    );
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
      (filterStatus === EFilterStatus.Active
        ? !task.completed
        : task.completed);

    const priorityMatch =
      filterPriority === EFilterPriority.All ||
      (task.priority as unknown as EFilterPriority) === filterPriority;

    const dueDateMatch =
      filterDueDate === null || (task.dueDate && task.dueDate <= filterDueDate);

    return statusMatch && priorityMatch && dueDateMatch;
  });
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { data: fetchedTasks } = useGetTasksQuery();

  const [filterStatus, setFilterStatus] = useState<EFilterStatus>(
    EFilterStatus.All
  );

  const [filterPriority, setFilterPriority] = useState<EFilterPriority>(
    EFilterPriority.All
  );

  const [filterDueDate, setFilterDueDate] = useState<Date | null>(null);

  const [history, setHistory] = useState<ITask[][]>([]);

  const [redoStack, setRedoStack] = useState<ITask[][]>([]);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToLocalStorage(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (fetchedTasks) {
      setTasks(sortTasks(fetchedTasks));
    }
  }, [fetchedTasks]);

  const saveHistoryState = () => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
  };

  const filteredTasks = filterTasks(
    tasks,
    filterStatus,
    filterPriority,
    filterDueDate
  );

  return (
    <TasksContext.Provider
      value={{
        tasks: filteredTasks,
        setTasks,
        setFilterStatus,
        setFilterPriority,
        setFilterDueDate,
        saveHistoryState,
        history,
        setHistory,
        redoStack,
        setRedoStack,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
