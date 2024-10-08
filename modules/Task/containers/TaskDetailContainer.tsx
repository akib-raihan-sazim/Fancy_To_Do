import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Text,
  Badge,
  Group,
  Box,
  Paper,
  Center,
} from "@mantine/core";
import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from "react-icons/fa";

import {
  sortTasks,
  useTasks,
} from "@/modules/HomePage/components/TaskContext/TaskContext";
import DeleteConfirmationModal from "@/modules/HomePage/components/DeleteConfirmationModal/DeleteConfirmationModel";
import ToDoForm from "@/modules/HomePage/components/ToDoForm/ToDoForm";
import { EFilterStatus, ITask } from "@/modules/HomePage/components/TaskContext/TaskContext.types";
import { getPriorityColor } from "@/shared/utils/priorityUtils";
import { formatDate } from "@/helper/tasks.helper";
import {
  useDeleteTaskMutation,
  useToggleTaskCompletionMutation,
} from "@/shared/redux/rtk-apis/apiSlice";

const TaskDetailContainer = () => {
  const router = useRouter();
  const { taskId } = router.query;
  const { tasks, setTasks, saveHistoryState, filterStatus } = useTasks();
  const [task, setTask] = useState<ITask | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();

  useEffect(() => {
    if (taskId && tasks) {
      const foundTask = tasks.find((t) => t.id === parseInt(taskId as string));
      if (foundTask) {
        setTask(foundTask);
      }
    }
  }, [taskId, tasks]);

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

  if (!task)
    return (
      <Center style={{ height: "100vh" }}>
        <Text>Loading...</Text>
      </Center>
    );

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderColor: getPriorityColor(task.priority),
      }}
    >
      <Button
        variant="subtle"
        onClick={() => router.push("/Home")}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        <FaArrowLeft size={16} className="left-icon" />
        Back to Home
      </Button>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
        style={{ borderColor: getPriorityColor(task.priority) }}
      >
        <Box mb="md">
          <Text size="xl">{task.title}</Text>
          <Text size="sm" mb="md">
            {task.summary}
          </Text>
          <Group>
            <Badge
              color={getPriorityColor(task.priority)}
              variant="light"
              size="lg"
            >
              {task.priority}
            </Badge>
            <Badge
              color={task.completed ? "green" : "blue"}
              variant="light"
              size="lg"
            >
              {task.completed ? "Completed" : "In Progress"}
            </Badge>
          </Group>
        </Box>
        <Text mb="md">Due Date: {formatDate(task.dueDate)}</Text>
        <Group mt="xl">
          <Button variant="outline" onClick={() => setEditModalOpened(true)}>
            Edit <FaEdit className="left-icon" />
          </Button>
          <Button
            color={task.completed ? "gray" : "blue"}
            onClick={handleToggleCompletion}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Done"}
            <FaCheck className="left-icon" />
          </Button>
          <Button
            variant="subtle"
            color="red"
            onClick={() => setModalOpen(true)}
          >
            Delete <FaTrash className="left-icon" />
          </Button>
        </Group>
      </Paper>
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
    </Container>
  );
};

export default TaskDetailContainer;
