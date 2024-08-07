import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { TasksProvider } from "@/modules/HomePage/components/TaskContext/TaskContext";
import { store } from "@/shared/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Provider store = {store}>
        <TasksProvider>
          <Component {...pageProps} />
        </TasksProvider>
      </Provider>
    </MantineProvider>
  );
}
