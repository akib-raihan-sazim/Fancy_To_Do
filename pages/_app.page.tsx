import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

import { TasksProvider } from "@/modules/HomePage/components/TaskContext/TaskContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <TasksProvider>
        <Component {...pageProps} />
      </TasksProvider>
    </MantineProvider>
  );
}
