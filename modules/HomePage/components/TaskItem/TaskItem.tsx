import { useState } from "react";
import { Card, Group, Text, Badge } from "@mantine/core";

import { useTasks } from "../TaskContext/TaskContext";
import { ITaskItemProps } from "./TaskItem.types";
import Link from "next/link";
import { getPriorityColor } from "@/utils/priorityUtils";

const TaskItem = ({ task }: ITaskItemProps) => {
  const { deleteTask } = useTasks();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    setModalOpen(false);
  };

  return (
    <Link href={`/Task/${task.id}`} style={{ textDecoration: "none" }}>
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
      </Card>
    </Link>
  );
};

export default TaskItem;
