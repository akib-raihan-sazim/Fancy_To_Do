import { Button, Group } from "@mantine/core";
import { useState } from "react";
import ToDoForm from "./ToDoForm";

interface Task {
  id: number;
  title: string;
  summary: string;
  dueDate: Date | null;
  priority: "High" | "Medium" | "Low";
}

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  
  const [editModalOpened, setEditModalOpened] = useState(false);

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
      {editModalOpened && (
        <ToDoForm
          opened={editModalOpened}
          setOpened={setEditModalOpened}
        />
      )}
    </div>
  );
};

export default TaskItem;
