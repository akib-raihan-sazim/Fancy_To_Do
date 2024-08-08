import { Card, Group, Text, Badge, Button } from "@mantine/core";
import Link from "next/link";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";

import { formatDate } from "@/helper/tasks.helper";
import { getPriorityColor } from "@/shared/utils/priorityUtils";
import {
  useDeleteTaskMutation,
  useToggleTaskCompletionMutation,
} from "@/shared/redux/rtk-apis/apiSlice";

import { ITaskItemProps } from "./TaskItem.types";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModel";
import { sortTasks, useTasks } from "../TaskContext/TaskContext";
import { EFilterStatus } from "../TaskContext/TaskContext.types";

const TaskItem = ({ task }: ITaskItemProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();
  const { setTasks, saveHistoryState, filterStatus } = useTasks();
  const router = useRouter();

  const handleDelete = async () => {
    if (task) {
      try {
        await deleteTask(task.id).unwrap();
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        router.push("/Home");
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
      saveHistoryState();
    }
  };

  const handleToggleCompletion = async () => {
    if (task) {
      try {
        const updatedTask = {
          ...task,
          completed: !task.completed,
        };
        const result = await toggleTaskCompletion(updatedTask.id).unwrap();
        setTasks((prevTasks) =>
          sortTasks(
            prevTasks.map((task) => (task.id === result.id ? result : task))
          )
        );
      } catch (error) {
        console.error("Failed to toggle task completion:", error);
      }
      saveHistoryState();
      if (filterStatus !== EFilterStatus.All) {
        router.push("/Home");
      }
    }
  };

  return (
    <>
      <Card
        shadow="sm"
        m="lg"
        radius="md"
        withBorder
        style={{
          borderColor: getPriorityColor(task.priority),
          position: "relative",
          padding: "1rem",
        }}
        className="task-card"
      >
        <div className="task-buttons">
          <Button
            variant="subtle"
            color="red"
            onClick={() => setModalOpen(true)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
            }}
            className="delete-button"
          >
            <FaTrash className="left-icon" />
          </Button>
        </div>
        <Group mb="xs">
          <Link href={`/Task/${task.id}`} style={{ textDecoration: "none" }}>
            <Text
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </Text>
          </Link>
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
          Due Date: {formatDate(task.dueDate)}
        </Text>
        <div className="task-buttons">
          <Button
            color={task.completed ? "gray" : "blue"}
            onClick={handleToggleCompletion}
            style={{
              marginTop: "10px",
              width: "50px",
              fontSize: "0.8rem",
            }}
            className="toggle-button"
          >
            {task.completed ? <FaTimes /> : <FaCheck />}
          </Button>
        </div>
      </Card>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default TaskItem;
