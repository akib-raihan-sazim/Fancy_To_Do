import { useEffect } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

import { Task, useTasks } from "../../../contexts/TasksContext";

interface ToDoFormProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  editingTask?: Task | null;
}

const ToDoForm = ({ opened, setOpened, editingTask }: ToDoFormProps) => {
  const { addTask, editTask } = useTasks();

  const form = useForm({
    initialValues: {
      title: "",
      summary: "",
      dueDate: null as Date | null,
      priority: null as "High" | "Medium" | "Low" | null,
    },

    validate: {
      title: (value) => {
        const trimmedValue = value.trim();
        return trimmedValue.length < 2 ? "Title must have at least 2 letters" : null;
      },

      summary: (value) => {
        const trimmedValue = value.trim();
        return trimmedValue.length < 5 ? "Summary must have at least 5 letters" : null;
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

  const handleCreateOrEditTask = (values: typeof form.values) => {
    const { title, summary, dueDate, priority } = values;
    if (!priority) {
      form.setFieldError("priority", "Priority is required");
      return;
    }
    if (editingTask) {
      editTask({ ...editingTask, title, summary, dueDate, priority });
    } else {
      addTask({ title, summary, dueDate, priority });
    }
    setOpened(false);
    form.reset();
  };

  useEffect(() => {
    if (editingTask) {
      form.setValues({
        title: editingTask.title,
        summary: editingTask.summary,
        dueDate: editingTask.dueDate,
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
