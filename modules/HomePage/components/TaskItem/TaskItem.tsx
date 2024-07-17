import { useState } from "react";
import { Card, Button, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { Task, useTasks } from "../TaskContext/TaskContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModel";
import ToDoForm from "../ToDoForm/ToDoForm";
import { TaskItemProps } from "./TaskItem.types";

const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask, toggleTaskCompletion } = useTasks();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    setModalOpen(false);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return "blue";
      case "Medium":
        return "green";
      case "Low":
        return "red";
    }
  };

  return (
    <Card
      shadow="sm"
      m="lg"
      radius="md"
      withBorder
      style={{
        borderColor: getPriorityColor(task.priority),
        position: "relative",
      }}
    >
      <ActionIcon
        variant="subtle"
        color="red"
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={() => setModalOpen(true)}
      >
        <FaRegTrashAlt size={18} />
      </ActionIcon>
      <Group mb="xs">
        <Text
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.title}
        </Text>
        <Badge color={getPriorityColor(task.priority)} variant="light">
          {task.priority}
        </Badge>
      </Group>

      <Text
        size="sm"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.summary}
      </Text>
      <Text
        size="xs"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        Due Date: {task.dueDate ? task.dueDate.toDateString() : "No due date"}
      </Text>

      <Group mt="md">
        {!task.completed && (
          <Button variant="outline" onClick={() => setEditModalOpened(true)}>
            Edit <FiEdit className="left-icon" />
          </Button>
        )}
        <Button
          variant={task.completed ? "light" : "outline"}
          color={task.completed ? "green" : "blue"}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.completed ? "Completed" : "Complete"}
        </Button>
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
    </Card>
  );
};

export default TaskItem;
