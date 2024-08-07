import {Dispatch, SetStateAction } from "react";

export interface ITasksContext {
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
    toggleTaskCompletion: (id: number) => void;
    setFilterStatus: (status: EFilterStatus) => void;
    setFilterPriority: (priority: EFilterPriority) => void;
    setFilterDueDate: (dueDate: Date | null) => void;
    undoLastAction: () => void;
    redoLastAction: () => void;
    saveHistoryState: () => void;
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