import { Button } from "@mantine/core";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from "@/shared/redux/rtk-apis/apiSlice";

import { useTasks } from "../TaskContext/TaskContext";

const UndoRedoButtons = () => {
  const { tasks, setTasks, history, setHistory, redoStack, setRedoStack } = useTasks();

  const [createTask] = useCreateTaskMutation();

  const [updateTask] = useUpdateTaskMutation();

  const [deleteOne] = useDeleteTaskMutation();

  const undoLastAction = async () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      try {
        await Promise.all(
          tasks.filter((task) => !previousState.some((t) => t.id === task.id)).map(async (task) => {
            await deleteOne(task.id);
          })
        );
  
        await Promise.all(
          previousState.map(async (task) => {
            const existingTask = tasks.find((t) => t.id === task.id);
            if (existingTask) {
              await updateTask(task);
            } else {
              await createTask(task);
            }
          })
        );
  
        setTasks(previousState);
        setHistory(history.slice(0, -1));
        setRedoStack((prevRedoStack) => [...prevRedoStack, tasks]);
      } catch (error) {
        console.error("Failed to undo last action:", error);
      }
    }
  };

  const redoLastAction = async () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      try {
        await Promise.all(
          tasks.filter((task) => !nextState.some((t) => t.id === task.id)).map(async (task) => {
            await deleteOne(task.id);
          })
        );
  
        await Promise.all(
          nextState.map(async (task) => {
            const existingTask = tasks.find((t) => t.id === task.id);
            if (existingTask) {
              await updateTask(task);
            } else {
              await createTask(task);
            }
          })
        );
  
        setHistory((prevHistory) => [...prevHistory, tasks]);
        setTasks(nextState);
        setRedoStack(redoStack.slice(0, -1));
      } catch (error) {
        console.error("Failed to redo last action:", error);
      }
    }
  };

  const buttonStyle = {
    width: "30%",
    margin: "2em",
  };

  return (
    <>
      <Button
        style={buttonStyle}
        variant="gradient"
        gradient={{ from: "red", to: "orange", deg: 90 }}
        onClick={undoLastAction}
      >
        <FaArrowAltCircleLeft className="left-icon" />
        UNDO
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: "red", to: "orange", deg: 90 }}
        onClick={redoLastAction}
        style={buttonStyle}
      >
        REDO
        <FaArrowAltCircleRight className="left-icon" />
      </Button>
    </>
  );
};

export default UndoRedoButtons;
