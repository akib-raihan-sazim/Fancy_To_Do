import { useState } from "react";
import { Button, Container} from "@mantine/core";

import { TasksProvider, useTasks } from "../components/TaskContext/TaskContext";
import ToDoForm from "../components/ToDoForm/ToDoForm";
import TaskList from "../components/TaskList/TaskList";
import UndoRedoButtons from "../components/UndoRedoButtons/UndoRedoButtons";

const HomeContainer = () => {
  const [opened, setOpened] = useState(false);

  const handleToDoForm = () => {
    setOpened(true);
  };

  return (
    <TasksProvider>
      <Container>
        <h1 className="title">Fancy To-Do With TypeScript</h1>
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
    </TasksProvider>
  );
};

export default HomeContainer;
