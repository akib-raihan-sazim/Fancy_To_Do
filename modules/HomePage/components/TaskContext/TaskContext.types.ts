import {Dispatch, SetStateAction } from "react";

export interface ITasksContext {
    tasks: ITask[];
    history: ITask[][];
    setHistory: Dispatch<SetStateAction<ITask[][]>>;
    redoStack: ITask[][];
    setRedoStack: Dispatch<SetStateAction<ITask[][]>>;
    setTasks: Dispatch<SetStateAction<ITask[]>>;
    setFilterStatus: (status: EFilterStatus) => void;
    setFilterPriority: (priority: EFilterPriority) => void;
    setFilterDueDate: (dueDate: Date | null) => void;
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