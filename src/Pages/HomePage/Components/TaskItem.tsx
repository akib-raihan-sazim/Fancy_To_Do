import { Button, Group } from "@mantine/core";

import { Task } from "../../../contexts/TasksContext";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  
  return (
    <div className="taskItem">
      <h3>{task.title}</h3>
      <p>{task.summary}</p>
      <p>
        Due Date: {task.dueDate ? task.dueDate.toDateString() : "No due date"}
      </p>
      <p>Priority: {task.priority}</p>
      <Group>
        <Button variant="subtle">
          Delete
        </Button>
        <Button>Edit</Button>
      </Group>
    </div>
  );
};
export default TaskItem;
