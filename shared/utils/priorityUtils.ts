import { ITask } from "@/modules/HomePage/components/TaskContext/TaskContext.types";

export const getPriorityColor = (priority: ITask["priority"]) => {
  switch (priority) {
    case "High":
      return "blue";
    case "Medium":
      return "green";
    case "Low":
      return "red";
    default:
      return "gray";
  }
};
