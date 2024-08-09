import { EPriority } from "@/modules/HomePage/components/TaskContext/TaskContext.types";

export type TCreateTaskDto = {
    title: string;
    summary: string;
    dueDate: Date | null;
    priority: EPriority;
};