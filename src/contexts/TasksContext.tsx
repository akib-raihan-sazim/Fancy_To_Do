import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  summary: string;
  dueDate: Date | null;
  priority: 'High' | 'Medium' | 'Low';
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (id: number) => void;
  editTask: (updatedTask: Task) => void;
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

const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder: { [key in Task['priority']]: number } = { 'High': 1, 'Medium': 2, 'Low': 3 };
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => sortTasksByPriority(loadTasksFromLocalStorage()));

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now() };
    setTasks(prevTasks => sortTasksByPriority([...prevTasks, newTask]));
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
    setTasks(prevTasks => sortTasksByPriority(prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, editTask }}>
      {children}
    </TasksContext.Provider>
  );
};
