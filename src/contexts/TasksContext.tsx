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

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now() };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, editTask }}>
      {children}
    </TasksContext.Provider>
  );
};
