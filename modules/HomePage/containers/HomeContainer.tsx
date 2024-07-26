import { useState } from "react";
import { Button, Container, Group } from "@mantine/core";
import { useRouter } from "next/router";

import ToDoForm from "../components/ToDoForm/ToDoForm";
import TaskList from "../components/TaskList/TaskList";
import UndoRedoButtons from "../components/UndoRedoButtons/UndoRedoButtons";

const HomeContainer = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const handleToDoForm = () => {
    setOpened(true);
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <Container>
      <Group mb="md">
        <h1 className="title">Fancy To-Do With TypeScript</h1>
        <Button
          variant="outline"
          color="red"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Group>
      <Button
        fullWidth
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        onClick={handleToDoForm}
      >
        Add Task
      </Button>
      <div className="undo-redo-space">
        <UndoRedoButtons />
      </div>
      <ToDoForm opened={opened} setOpened={setOpened} />
      <TaskList />
    </Container>
  );
};

export default HomeContainer;