import { useState } from "react";
import { Button, Container, Group } from "@mantine/core";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import ToDoForm from "../Components/ToDoForm";
import TaskList from "../Components/TaskList";
import { useTasks } from "../../../contexts/TasksContext";

const HomePageContainer = () => {
  const [opened, setOpened] = useState(false);
  const { undoLastAction } = useTasks();

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
      <Group className="undo-redo-space">
        <Button
          className="undo-btn"
          variant="gradient"
          gradient={{ from: "red", to: "orange", deg: 90 }}
          onClick={undoLastAction}
        >
          <FaArrowAltCircleLeft className="left-icon" />
          UNDO
        </Button>
      </Group>
      <ToDoForm opened={opened} setOpened={setOpened} />
      <TaskList />
    </Container>
  );
};

export default HomePageContainer;
