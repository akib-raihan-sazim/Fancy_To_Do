import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { TasksContextType } from "./TaskContext.types";

export interface Task {
  id: number;
  title: string;
  summary: string;
  dueDate: Date | null;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

const loadTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== "undefined") {
    const tasks = localStorage.getItem("tasks");
    if (!tasks) return [];
    try {
      const parsedTasks: Task[] = JSON.parse(tasks);
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

const sortTasks = (tasks: Task[]): Task[] => {
  const priorityOrder: { [key in Task["priority"]]: number } = {
    High: 1,
    Medium: 2,
    Low: 3,
  };
  return tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

const filterTasks = (
  tasks: Task[],
  filterStatus: string,
  filterPriority: string,
  filterDueDate: Date | null
): Task[] => {
  return tasks.filter((task) => {
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "active" ? !task.completed : task.completed);

    const priorityMatch =
      filterPriority === "all" || task.priority === filterPriority;

    const dueDateMatch =
      filterDueDate === null || (task.dueDate && task.dueDate <= filterDueDate);

    return statusMatch && priorityMatch && dueDateMatch;
  });
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "completed"
  >("all");

  const [filterPriority, setFilterPriority] = useState<
    "High" | "Medium" | "Low" | "all"
  >("all");

  const [filterDueDate, setFilterDueDate] = useState<Date | null>(null);

  const [history, setHistory] = useState<Task[][]>([]);

  const [redoStack, setRedoStack] = useState<Task[][]>([]);

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

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
    saveHistoryState();
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    saveHistoryState();
  };

  const editTask = (updatedTask: Task) => {
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
