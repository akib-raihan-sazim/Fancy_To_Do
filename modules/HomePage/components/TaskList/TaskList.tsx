import { Select, Group, Button, Container, Pagination } from "@mantine/core";
import { useState, useEffect } from "react";
import { DateInput } from "@mantine/dates";

import { useClearCompletedTasksMutation } from "@/shared/redux/rtk-apis/apiSlice";

import { filterTasks, useTasks } from "../TaskContext/TaskContext";
import TaskItem from "../TaskItem/TaskItem";
import {
  EFilterPriority,
  EFilterStatus,
  EPriority,
} from "../TaskContext/TaskContext.types";

const TASKS_PER_PAGE = 5;

const TaskList = () => {
  const {
    tasks,
    setTasks,
    setFilterStatus,
    setFilterPriority,
    setFilterDueDate,
    saveHistoryState,
    filterStatus,
    filterPriority,
    filterDueDate,
  } = useTasks();

  const [currentPage, setCurrentPage] = useState(1);

  const [clearCompletedTasks] = useClearCompletedTasksMutation();

  const handleFilterStatusChange = (value: EFilterStatus) => {
    setFilterStatus(value);
    setCurrentPage(1); 
  };

  const handleFilterPriorityChange = (value: EFilterPriority) => {
    setFilterPriority(value);
    setCurrentPage(1);
  };

  const handleFilterDueDateChange = (date: Date | null) => {
    setFilterDueDate(date);
    setCurrentPage(1);
  };

  const handleClearCompletedTasks = async () => {
    try {
      await clearCompletedTasks().unwrap();
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
      saveHistoryState();
    } catch (error) {
      console.error("Failed to clear completed tasks:", error);
    }
  };

  const filteredTasks = filterTasks(
    tasks,
    filterStatus,
    filterPriority,
    filterDueDate
  );

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const tasksToDisplay = filteredTasks.slice(startIndex, endIndex);

  return (
    <div className="taskList">
      <Container className="clear-task-btn-container">
        <Button color="red" onClick={handleClearCompletedTasks}>
          Clear Completed Tasks
        </Button>
      </Container>
      <div className="taskFilter">
        <Group mb="md">
          <Select
            placeholder="Filter by Status"
            data={[
              { value: EFilterStatus.All, label: "All" },
              { value: EFilterStatus.Active, label: "Active" },
              { value: EFilterStatus.Completed, label: "Completed" },
            ]}
            value={filterStatus}
            onChange={(value) =>
              handleFilterStatusChange(value as EFilterStatus)
            }
          />
          <Select
            placeholder="Filter by Priority"
            data={[
              { value: EFilterPriority.All, label: "All" },
              { value: EPriority.High, label: "High" },
              { value: EPriority.Medium, label: "Medium" },
              { value: EPriority.Low, label: "Low" },
            ]}
            value={filterPriority}
            onChange={(value) =>
              handleFilterPriorityChange(value as EFilterPriority)
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
      {tasksToDisplay.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <Container className="pagination-container">
        <Pagination
          value={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={totalPages}
          siblings={1}
          style={{
            marginBottom: "2em"
          }}
        />
      </Container>
    </div>
  );
};

export default TaskList;
