import "./index.css";
import "@mantine/core/styles.css";
import { Button, Container, MantineProvider } from "@mantine/core";
import { useState } from "react";
import ToDoForm from "./components/ToDoForm";
import '@mantine/dates/styles.css';
import { TasksProvider } from "./contexts/TasksContext";
import "./index.css"

function App() {
  const handleToDoForm = () => {
    setOpened(true);
  };

  const [opened, setOpened] = useState(false);
  return (
    <TasksProvider>
      <MantineProvider defaultColorScheme="dark">
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
          <ToDoForm opened={opened} setOpened={setOpened}/>
        </Container>
      </MantineProvider>
    </TasksProvider>
  );
}

export default App;
