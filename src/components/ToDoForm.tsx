import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  Popover,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useTasks } from "../contexts/TasksContext";


interface ToDoFormProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}


const ToDoForm = ({ opened, setOpened}: ToDoFormProps) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low' | null>(null);

  const handleCreateTask = () => {
    if (title && summary && priority) {
      
      addTask({ title, summary, dueDate, priority });
      
      setTitle("");
      setSummary("");
      setDueDate(null);
      setPriority(null);
      setOpened(false);
    }
  };

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
      <div className="popOver">
        <Popover position="bottom">
          <Popover.Target>
            <Button>Pick Due Date</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker value={dueDate} onChange={setDueDate} />
          </Popover.Dropdown>
        </Popover>
      </div>
      <Group mt={"md"}>
        <Button
          onClick={() => {
            setOpened(false);
          }}
          variant={"subtle"}
        >
          Cancel
        </Button>
        <Button onClick={handleCreateTask}>
          Create Task
        </Button>
      </Group>
    </Modal>
  );
};

export default ToDoForm;
