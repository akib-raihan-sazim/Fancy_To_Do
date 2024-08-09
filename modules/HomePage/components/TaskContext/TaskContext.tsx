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

export const filterTasks = (
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

    const dueDateMatch = () => {
      if (filterDueDate === null) return true;
      if (!task.dueDate) return false;
      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);
      const filterDate = new Date(filterDueDate);
      filterDate.setHours(0, 0, 0, 0);
      return taskDueDate <= filterDate;
    };

    return statusMatch && priorityMatch && dueDateMatch();
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
        filterStatus,
        filterPriority,
        filterDueDate,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
