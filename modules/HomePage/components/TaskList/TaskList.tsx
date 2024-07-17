import { Select, Group, Button, Container } from "@mantine/core";
import { useState } from "react";
import { DateInput } from "@mantine/dates";

import { useTasks } from "../TaskContext/TaskContext";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const {
    tasks,
    setFilterStatus,
    setFilterPriority,
    setFilterDueDate,
    clearCompletedTasks,
  } = useTasks();

  const [filterStatus, setFilterStatusState] = useState<
    "all" | "active" | "completed"
  >("all");

  const [filterPriority, setFilterPriorityState] = useState<
    "High" | "Medium" | "Low" | "all"
  >("all");

  const [filterDueDate, setFilterDueDateState] = useState<Date | null>(null);

  const handleFilterStatusChange = (value: "all" | "active" | "completed") => {
    setFilterStatus(value);
    setFilterStatusState(value);
  };

  const handleFilterPriorityChange = (
    value: "High" | "Medium" | "Low" | "all"
  ) => {
    setFilterPriority(value);
    setFilterPriorityState(value);
  };

  const handleFilterDueDateChange = (date: Date | null) => {
    setFilterDueDate(date);
    setFilterDueDateState(date);
  };

  return (
    <div className="taskList">
      <Container className="clear-task-btn-container">
        <Button color="red" onClick={clearCompletedTasks}>
          Clear Completed Tasks
        </Button>
      </Container>
      <div className="taskFilter">
        <Group mb="md">
          <Select
            placeholder="Filter by Status"
            data={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "completed", label: "Completed" },
            ]}
            value={filterStatus}
            onChange={(value) =>
              handleFilterStatusChange(value as "all" | "active" | "completed")
            }
          />
          <Select
            placeholder="Filter by Priority"
            data={[
              { value: "all", label: "All" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
            value={filterPriority}
            onChange={(value) =>
              handleFilterPriorityChange(
                value as "High" | "Medium" | "Low" | "all"
              )
            }
          />
          <DateInput
            placeholder="Filter by Due Date"
            value={filterDueDate}
            onChange={handleFilterDueDateChange}
          />
          <Button
            onClick={() => {
              handleFilterStatusChange("all");
              handleFilterPriorityChange("all");
              handleFilterDueDateChange(null);
            }}
          >
            Reset Filters
          </Button>
        </Group>
      </div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
