import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import TaskService from "../services/TaskService";

import {
  getTodayDateKey,
  getTaskProgressByDate,
  saveTaskProgressByDate,
} from "../utils/taskStorage";

// ==========================================
// CREATE CONTEXT
// ==========================================

const TaskContext = createContext();

// ==========================================
// NORMALIZE TASK PRIORITY
// ==========================================

const normalizePriority = (priority) => {
  switch (
    priority?.toString().trim().toLowerCase()
  ) {
    case "high":
      return "High";

    case "medium":
      return "Medium";

    case "low":
      return "Low";

    case "normal":
      return "Medium";

    default:
      return "Medium";
  }
};

// ==========================================
// NORMALIZE TASK ID
// ==========================================

const normalizeTaskId = (id) => {
  if (id === null || id === undefined) {
    return "";
  }

  return String(id);
};

// ==========================================
// NORMALIZE TASK
// ==========================================

const normalizeTask = (task) => ({
  ...task,

  priority: normalizePriority(
    task.priority
  ),
});

// ==========================================
// PROVIDER
// ==========================================

export const TaskProvider = ({
  children,
}) => {
  const [tasks, setTasks] = useState([]);

  // ==========================================
  // LOAD TASKS
  // ==========================================

  useEffect(() => {
    const todayKey =
      getTodayDateKey();

    const savedProgress =
      getTaskProgressByDate(todayKey);

    const storedTasks =
      TaskService.getTasks();

    // ========================================
    // NORMALIZE STORED TASKS
    // ========================================

    const updatedTasks =
      storedTasks.map((task) => ({
        ...normalizeTask(task),

        status:
          savedProgress[
            task.id
          ] === "completed"
            ? "completed"
            : task.status ?? "pending",
      }));

    setTasks(updatedTasks);

    // Save normalized data
    TaskService.saveTasks(
      updatedTasks
    );
  }, []);

  // ==========================================
  // ADD TASK
  // ==========================================

  const addTask = (task) => {
    const normalizedTask =
      normalizeTask(task);

    const updatedTasks = [
      ...tasks,
      normalizedTask,
    ];

    setTasks(updatedTasks);

    TaskService.saveTasks(
      updatedTasks
    );
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTask = (taskId) => {
    const normalizedTaskId =
      normalizeTaskId(taskId);

    const updatedTasks =
      tasks.filter(
        (task) =>
          normalizeTaskId(
            task.id
          ) !== normalizedTaskId
      );

    const taskWasDeleted =
      updatedTasks.length <
      tasks.length;

    // Update React state
    setTasks(updatedTasks);

    // Update localStorage
    TaskService.saveTasks(
      updatedTasks
    );

    // Return result to caller
    return taskWasDeleted;
  };

  // ==========================================
  // UPDATE TASK
  // ==========================================

  const updateTask = (
    updatedTask
  ) => {
    const normalizedTask =
      normalizeTask(updatedTask);

    const normalizedTaskId =
      normalizeTaskId(
        normalizedTask.id
      );

    const updatedTasks =
      tasks.map((task) =>
        normalizeTaskId(
          task.id
        ) === normalizedTaskId
          ? normalizedTask
          : task
      );

    setTasks(updatedTasks);

    TaskService.saveTasks(
      updatedTasks
    );
  };

  // ==========================================
  // TOGGLE TASK COMPLETE
  // ==========================================

  const toggleTaskComplete = (
    taskId
  ) => {
    const todayKey =
      getTodayDateKey();

    const normalizedTaskId =
      normalizeTaskId(taskId);

    const updatedTasks =
      tasks.map((task) =>
        normalizeTaskId(
          task.id
        ) === normalizedTaskId
          ? {
              ...task,

              status:
                task.status ===
                "completed"
                  ? "pending"
                  : "completed",
            }
          : task
      );

    setTasks(updatedTasks);

    TaskService.saveTasks(
      updatedTasks
    );

    saveTaskProgressByDate(
      todayKey,
      updatedTasks
    );
  };

  // ==========================================
  // TASK STATISTICS
  // ==========================================

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  const pendingTasks =
    totalTasks -
    completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <TaskContext.Provider
      value={{
        tasks,

        totalTasks,

        completedTasks,

        pendingTasks,

        progress,

        addTask,

        deleteTask,

        updateTask,

        toggleTaskComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const useTaskContext = () => {
  const context =
    useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTaskContext must be used inside TaskProvider"
    );
  }

  return context;
};