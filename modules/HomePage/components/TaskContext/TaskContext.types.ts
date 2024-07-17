import { Task } from "./TaskContext";

export interface TasksContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, "id" | "completed">) => void;
    deleteTask: (id: number) => void;
    editTask: (updatedTask: Task) => void;
    toggleTaskCompletion: (id: number) => void;
    setFilterStatus: (status: "all" | "active" | "completed") => void;
    setFilterPriority: (priority: "High" | "Medium" | "Low" | "all") => void;
    setFilterDueDate: (dueDate: Date | null) => void;
    clearCompletedTasks: () => void;
    undoLastAction: () => void;
    redoLastAction: () => void;
}