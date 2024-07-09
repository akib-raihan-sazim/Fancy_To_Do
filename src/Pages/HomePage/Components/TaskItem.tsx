import { useState } from 'react';
import { Button, Group } from "@mantine/core";
import { Task } from "../contexts/TasksContext";

import { Task, useTasks } from "../../../contexts/TasksContext";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ToDoForm from './ToDoForm';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask } = useTasks();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    setModalOpen(false);
  };

  return (
    <div className="taskItem">
      <h3>{task.title}</h3>
      <p>{task.summary}</p>
      <p>
        Due Date: {task.dueDate ? task.dueDate.toDateString() : "No due date"}
      </p>
      <p>Priority: {task.priority}</p>
      <Group>
        <Button onClick={() => setModalOpen(true)} variant="subtle">
          Delete
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
