import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

<<<<<<< HEAD
export interface Task {
=======
interface Task {
>>>>>>> 0a21041 (feat(FTDA): Added Button for adding tasks.)
  id: number;
  title: string;
  summary: string;
  dueDate: Date | null;
  priority: 'High' | 'Medium' | 'Low';
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  if (!tasks) return [];
  try {
    const parsedTasks: Task[] = JSON.parse(tasks);
    return parsedTasks.map(task => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);
    return [];
  }
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromLocalStorage());

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now() };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask}}>
      {children}
    </TasksContext.Provider>
  );
};
