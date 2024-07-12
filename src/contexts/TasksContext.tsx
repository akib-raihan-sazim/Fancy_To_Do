import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface Task {
  id: number;
  title: string;
  summary: string;
  dueDate: Date | null;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed">) => void;
  deleteTask: (id: number) => void;
  editTask: (updatedTask: Task) => void;
  toggleTaskCompletion: (id: number) => void;
  setFilterStatus: (status: 'all' | 'active' | 'completed') => void;
  setFilterPriority: (priority: 'High' | 'Medium' | 'Low' | 'all') => void;
  setFilterDueDate: (dueDate: Date | null) => void;
  clearCompletedTasks: () => void;
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
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = (): Task[] => {
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

const filterTasks = (tasks: Task[], filterStatus: string, filterPriority: string, filterDueDate: Date | null): Task[] => {
  return tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || (filterStatus === 'active' ? !task.completed : task.completed);

    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;

    const dueDateMatch = filterDueDate === null || (task.dueDate && task.dueDate.toDateString() === filterDueDate.toDateString());
    
    return statusMatch && priorityMatch && dueDateMatch;
  });
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() =>
    sortTasks(loadTasksFromLocalStorage())
  );
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'High' | 'Medium' | 'Low' | 'all'>('all');
  const [filterDueDate, setFilterDueDate] = useState<Date | null>(null);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      sortTasks(
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      )
    );
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      sortTasks(
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    );
  };

  const filteredTasks = filterTasks(tasks, filterStatus, filterPriority, filterDueDate);

  const clearCompletedTasks = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  return (
    <TasksContext.Provider
      value={{ tasks: filteredTasks, addTask, deleteTask, editTask, toggleTaskCompletion, setFilterStatus, setFilterPriority, setFilterDueDate, clearCompletedTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};
