import { useState } from "react";
import { Button, Checkbox, Group } from "@mantine/core";

import { Task, useTasks } from "../../../contexts/TasksContext";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ToDoForm from "./ToDoForm";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask, toggleTaskCompletion } = useTasks();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    setModalOpen(false);
  };

  return (
    <div className="taskItem">
      <div className={`taskContent ${task.completed ? "completed" : ""}`}>
        <h3>{task.title}</h3>
        <p>{task.summary}</p>
        <p>
          Due Date: {task.dueDate ? task.dueDate.toDateString() : "No due date"}
        </p>
        <p>Priority: {task.priority}</p>
      </div>
      <Group>
        <Button onClick={() => setModalOpen(true)} variant="subtle">
          Delete
        </Button>
        <Button
          onClick={() => toggleTaskCompletion(task.id)}
          variant={task.completed ? "light" : "outline"}
        >
          {task.completed ? "Completed" : "Complete"}
        </Button>
        <Button onClick={() => setEditModalOpened(true)}>Edit</Button>
      </Group>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
      {editModalOpened && (
        <ToDoForm
          opened={editModalOpened}
          setOpened={setEditModalOpened}
          editingTask={task}
        />
      )}
    </div>
  );
};
export default TaskItem;
