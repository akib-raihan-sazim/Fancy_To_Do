import { useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

import { useCreateTaskMutation, useUpdateTaskMutation } from "@/shared/redux/rtk-apis/apiSlice";

import { sortTasks, useTasks } from "../TaskContext/TaskContext";
import { IToDoFormProps } from "./ToDoForm.types";
import { EPriority } from "../TaskContext/TaskContext.types";


const ToDoForm = ({ opened, setOpened, editingTask }: IToDoFormProps) => {
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const { setTasks, saveHistoryState } = useTasks();

  const form = useForm({
    initialValues: {
      title: "",
      summary: "",
      dueDate: null as Date | null,
      priority: null as EPriority | null,
    },

    validate: {
      title: (value) => {
        const trimmedValue = value.trim();
        return trimmedValue.length < 2
          ? "Title must have at least 2 letters"
          : null;
      },

      summary: (value) => {
        const trimmedValue = value.trim();
        return trimmedValue.length < 5
          ? "Summary must have at least 5 letters"
          : null;
      },

      priority: (value) => (value ? null : "Priority is required"),

      dueDate: (value) => {
        if (!value) {
          return "Due date is required";
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (value < today) {
          return "Due date cannot be in the past";
        }
        return null;
      },
    },
  });

  const handleCreateOrEditTask = async (values: typeof form.values) => {
    const { title, summary, dueDate, priority } = values;
    const dueDateUTC = dueDate ? new Date(Date.UTC(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate()
    )) : null;

    if (!priority) {
      form.setFieldError("priority", "Priority is required");
      return;
    }

    try {
      if (editingTask) {
        const result = await updateTask({ ...editingTask, title, summary, dueDate: dueDateUTC, priority }).unwrap();
        setTasks(prevTasks => sortTasks(prevTasks.map(task => task.id === result.id ? result : task)));
      } else {
        const result = await createTask({ title, summary, dueDate: dueDateUTC, priority }).unwrap();
        setTasks(prevTasks => sortTasks([...prevTasks, result]));
      }
      saveHistoryState();
      setOpened(false);
      form.reset();
    } catch (error) {
      console.error("Failed to create/edit task:", error);
    }
  };

  useEffect(() => {
    if (editingTask) {
      form.setValues({
        title: editingTask.title,
        summary: editingTask.summary,
        dueDate: editingTask.dueDate ? new Date(editingTask.dueDate) : null,
        priority: editingTask.priority,
      });
    } else {
      form.reset();
    }
  }, [editingTask]);

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={editingTask ? "Edit Task" : "Create Task"}
      size="lg"
      style={{ maxWidth: 600 }}
    >
      <form onSubmit={form.onSubmit(handleCreateOrEditTask)}>
        <TextInput
          mt="md"
          label="Title"
          placeholder="Task Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          mt="md"
          label="Summary"
          placeholder="Task Summary"
          {...form.getInputProps("summary")}
        />
        <Select
          mt="md"
          label="Priority"
          placeholder="Select priority"
          data={priorityOptions}
          {...form.getInputProps("priority")}
          clearable
        />
        <DateInput
          mt="md"
          label="Due Date"
          placeholder="Pick due date"
          value={form.values.dueDate}
          {...form.getInputProps("dueDate")}
        />
        <Group mt="md">
          <Button
            onClick={() => {
              setOpened(false);
              form.reset();
            }}
            variant="light"
          >
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            {editingTask ? "Edit Task" : "Create Task"}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
export default ToDoForm;
