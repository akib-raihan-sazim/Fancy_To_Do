import { Task } from "../TaskContext/TaskContext";

export interface ToDoFormProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    editingTask?: Task | null;
}