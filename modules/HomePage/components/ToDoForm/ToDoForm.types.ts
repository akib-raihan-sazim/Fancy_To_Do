import { ITask } from "../TaskContext/TaskContext.types";

export interface IToDoFormProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    editingTask?: ITask | null;
}