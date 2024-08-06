import { Card, Group, Text, Badge } from "@mantine/core";
import Link from "next/link";

import { formatDate } from "@/helper/tasks.helper";
import { getPriorityColor } from "@/shared/utils/priorityUtils";
import { ITaskItemProps } from "./TaskItem.types";

const TaskItem = ({ task }: ITaskItemProps) => {
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
          Due Date: {formatDate(task.dueDate)}
        </Text>
      </Card>
    </Link>
  );
};

export default TaskItem;
