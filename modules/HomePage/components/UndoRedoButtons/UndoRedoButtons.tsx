import { Button } from "@mantine/core";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { useTasks } from "../TaskContext/TaskContext";

const UndoRedoButtons = () => {
  const { undoLastAction, redoLastAction } = useTasks();

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
