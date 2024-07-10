import { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

import { Task, useTasks } from "../../../contexts/TasksContext";

interface ToDoFormProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  editingTask?: Task | null;
}

const ToDoForm = ({ opened, setOpened, editingTask}: ToDoFormProps) => {
  const { addTask, editTask } = useTasks();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low' | null>(null);

  const handleCreateOrEditTask = () => {
    if (title && summary && priority) {
      if (editingTask) {
        editTask({ ...editingTask, title, summary, dueDate, priority });
      } else {
        addTask({ title, summary, dueDate, priority });
      }
      setTitle("");
      setSummary("");
      setDueDate(null);
      setPriority(null);
      setOpened(false);
    }
  };

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setSummary(editingTask.summary);
      setDueDate(editingTask.dueDate);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  return (
    <Modal
      opened={opened}
      withCloseButton={false}
      onClose={() => setOpened(false)}
    >
      <TextInput
        mt={"md"}
        placeholder={"Task Title"}
        required
        label={"Title"}
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <TextInput
        mt={"md"}
        placeholder={"Task Summary"}
        required
        label={"Summary"}
        value={summary}
        onChange={(event) => setSummary(event.currentTarget.value)}
      />
      <Select
        mt={"md"}
        placeholder={"Select priority"}
        label={"Priority"}
        data={[
          { value: "High", label: "High" },
          { value: "Medium", label: "Medium" },
          { value: "Low", label: "Low" },
        ]}
        value={priority}
        onChange={(value) => setPriority(value as 'High' | 'Medium' | 'Low')}
        clearable
      />
      <DateInput
        mt={"md"}
        label="Pick Due Date"
        placeholder="Pick due date"
        value={dueDate}
        onChange={setDueDate}
      />
      <Group mt={"md"}>
        <Button
          onClick={() => {
            setOpened(false);
          }}
          variant={"subtle"}
        >
          Cancel
        </Button>
        <Button onClick={handleCreateOrEditTask}>
          {editingTask ? "Edit Task" : "Create Task"}
        </Button>
      </Group>
    </Modal>
  );
};
export default ToDoForm;
