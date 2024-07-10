import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/dates/styles.css";

import "./index.css";
import { TasksProvider } from "./contexts/TasksContext";
import HomePageContainer from "./Pages/HomePage/Containers/HomePageContainer";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <TasksProvider>
        <HomePageContainer />
      </TasksProvider>
    </MantineProvider>
  );
}
export default App;
