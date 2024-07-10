import { useState } from "react";
import { Button, Container } from "@mantine/core";

import ToDoForm from "../Components/ToDoForm";
import TaskList from "../Components/TaskList";

const HomePageContainer = () => {
  const [opened, setOpened] = useState(false);

  const handleToDoForm = () => {
    setOpened(true);
  };

  return (
    <Container>
      <h1 className="title">Fancy To-DO With TypeScript</h1>
      <Button
        fullWidth
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        onClick={handleToDoForm}
      >
        Add Task
      </Button>
      <ToDoForm opened={opened} setOpened={setOpened} />
      <TaskList/>
    </Container>
  );
};

export default HomePageContainer;
