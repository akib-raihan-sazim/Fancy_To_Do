import { Select, Group, Button, Container } from "@mantine/core";
import { useState } from "react";
import { DateInput } from "@mantine/dates";

import { useTasks } from "../TaskContext/TaskContext";
import TaskItem from "../TaskItem/TaskItem";
import { EFilterPriority, EFilterStatus, EPriority } from "../TaskContext/TaskContext.types";

const TaskList = () => {
  const {
    tasks,
    setFilterStatus,
    setFilterPriority,
    setFilterDueDate,
    clearCompletedTasks,
  } = useTasks();

  const [filterStatus, setFilterStatusState] = useState<EFilterStatus>(EFilterStatus.All);

  const [filterPriority, setFilterPriorityState] = useState<EFilterPriority>(EFilterPriority.All);

  const [filterDueDate, setFilterDueDateState] = useState<Date | null>(null);

  const handleFilterStatusChange = (value: EFilterStatus) => {
    setFilterStatus(value);
    setFilterStatusState(value);
  };

  const handleFilterPriorityChange = (
    value: EFilterPriority
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
              handleFilterStatusChange(value as EFilterStatus)
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
                value as EFilterPriority
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
              handleFilterStatusChange(EFilterStatus.All);
              handleFilterPriorityChange(EFilterPriority.All);
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
