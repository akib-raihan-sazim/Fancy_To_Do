import { Task, useTasks } from "../../../contexts/TasksContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <div className="taskList">
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
export default TaskList;
