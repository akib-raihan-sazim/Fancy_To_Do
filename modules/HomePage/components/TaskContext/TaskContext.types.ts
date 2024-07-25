export interface ITasksContext {
    tasks: ITask[];
    addTask: (task: Omit<ITask, "id" | "completed">) => void;
    deleteTask: (id: number) => void;
    editTask: (updatedTask: ITask) => void;
    toggleTaskCompletion: (id: number) => void;
    setFilterStatus: (status: EFilterStatus) => void;
    setFilterPriority: (priority: EFilterPriority) => void;
    setFilterDueDate: (dueDate: Date | null) => void;
    clearCompletedTasks: () => void;
    undoLastAction: () => void;
    redoLastAction: () => void;
}

export enum EPriority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

export interface ITask {
    id: number;
    title: string;
    summary: string;
    dueDate: Date | null;
    priority: EPriority;
    completed: boolean;
}

export enum EFilterStatus {
    All = "all",
    Active = "active",
    Completed = "completed",
}
  
export enum EFilterPriority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
    All = "all",
}