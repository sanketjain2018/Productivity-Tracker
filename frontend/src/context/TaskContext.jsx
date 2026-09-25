import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import TaskService from "../services/TaskService";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

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

const normalizeTaskId = (id) => {
  if (id === null || id === undefined) {
    return "";
  }

  return String(id);
};

const normalizeStatus = (status) => {
  switch (
    status?.toString().trim().toLowerCase()
  ) {
    case "completed":
      return "completed";

    case "todo":
      return "pending";

    case "pending":
      return "pending";

    default:
      return "pending";
  }
};

const normalizeTask = (task) => ({
  ...task,

  id: normalizeTaskId(task.id),

  priority: normalizePriority(
    task.priority
  ),

  status: normalizeStatus(
    task.status
  ),
});

export const TaskProvider = ({ children }) => {

  const { isAuthenticated } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [summary, setSummary] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    progress: 0,
  });

  const [todayTasks, setTodayTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  // =========================
  // LOAD TASKS
  // =========================

  useEffect(() => {

    const loadTasks = async () => {

      if (!isAuthenticated) {

        setTasks([]);

        setTodayTasks([]);

        setSummary({
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
          progress: 0,
        });

        setLoading(false);

        setError(null);

        return;
      }

      try {

        setLoading(true);

        setError(null);

        const [
          taskResponse,
          summaryResponse,
          todayResponse,
        ] = await Promise.all([
          TaskService.getTasks(),
          TaskService.getTaskSummary(),
          TaskService.getTodayTasks(),
        ]);

        const normalizedTasks =
          (taskResponse || [])
            .map(normalizeTask);

        const normalizedTodayTasks =
          (todayResponse || [])
            .map(normalizeTask);

        setTasks(normalizedTasks);

        setTodayTasks(
          normalizedTodayTasks
        );

        setSummary({
          totalTasks:
            summaryResponse?.totalTasks || 0,

          completedTasks:
            summaryResponse?.completedTasks || 0,

          pendingTasks:
            summaryResponse?.pendingTasks || 0,

          progress:
            summaryResponse?.progress || 0,
        });

      } catch (err) {

        console.error(
          "Failed to load tasks:",
          err
        );

        setError(
          err.message ||
          "Failed to load tasks"
        );

        setTasks([]);

        setTodayTasks([]);

      } finally {

        setLoading(false);
      }
    };

    loadTasks();

  }, [isAuthenticated]);

  // =========================
  // ADD TASK
  // =========================

  const addTask = async (task) => {

    try {

      setError(null);

      const createdTask =
        await TaskService.addTask(task);

      const normalizedTask =
        normalizeTask(createdTask);

      setTasks((previousTasks) => [
        ...previousTasks,
        normalizedTask,
      ]);

      return normalizedTask;

    } catch (err) {

      console.error(
        "Failed to add task:",
        err
      );

      setError(
        err.message ||
        "Failed to add task"
      );

      throw err;
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (taskId) => {

    try {

      setError(null);

      const normalizedTaskId =
        normalizeTaskId(taskId);

      await TaskService.deleteTask(
        normalizedTaskId
      );

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) =>
            normalizeTaskId(task.id) !==
            normalizedTaskId
        )
      );

      setTodayTasks((previousTasks) =>
        previousTasks.filter(
          (task) =>
            normalizeTaskId(task.id) !==
            normalizedTaskId
        )
      );

      await refreshSummary();

      return true;

    } catch (err) {

      console.error(
        "Failed to delete task:",
        err
      );

      setError(
        err.message ||
        "Failed to delete task"
      );

      return false;
    }
  };

  // =========================
  // UPDATE TASK
  // =========================

  const updateTask = async (
    updatedTask
  ) => {

    try {

      setError(null);

      const normalizedTask =
        normalizeTask(updatedTask);

      const response =
        await TaskService.updateTask(
          normalizedTask
        );

      const updatedTaskFromBackend =
        normalizeTask(response);

      const normalizedTaskId =
        normalizeTaskId(
          updatedTaskFromBackend.id
        );

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          normalizeTaskId(task.id) ===
          normalizedTaskId
            ? updatedTaskFromBackend
            : task
        )
      );

      await refreshTodayTasks();

      await refreshSummary();

      return updatedTaskFromBackend;

    } catch (err) {

      console.error(
        "Failed to update task:",
        err
      );

      setError(
        err.message ||
        "Failed to update task"
      );

      throw err;
    }
  };

  // =========================
  // COMPLETE TASK
  // =========================

  const toggleTaskComplete =
    async (taskId) => {

      try {

        setError(null);

        const normalizedTaskId =
          normalizeTaskId(taskId);

        const currentTask =
          tasks.find(
            (task) =>
              normalizeTaskId(task.id) ===
              normalizedTaskId
          );

        if (!currentTask) {
          return;
        }

        let updatedTask;

        if (
          currentTask.status !==
          "completed"
        ) {

          updatedTask =
            await TaskService.completeTask(
              normalizedTaskId
            );

        } else {

          updatedTask =
            await TaskService.updateTask({
              ...currentTask,
              status: "TODO",
            });
        }

        const normalizedUpdatedTask =
          normalizeTask(updatedTask);

        setTasks((previousTasks) =>
          previousTasks.map((task) =>
            normalizeTaskId(task.id) ===
            normalizedTaskId
              ? normalizedUpdatedTask
              : task
          )
        );

        await refreshTodayTasks();

        await refreshSummary();

        return normalizedUpdatedTask;

      } catch (err) {

        console.error(
          "Failed to toggle task:",
          err
        );

        setError(
          err.message ||
          "Failed to update task status"
        );

        throw err;
      }
    };

  // =========================
  // REFRESH SUMMARY
  // =========================

  const refreshSummary = async () => {

    try {

      const response =
        await TaskService.getTaskSummary();

      setSummary({
        totalTasks:
          response?.totalTasks || 0,

        completedTasks:
          response?.completedTasks || 0,

        pendingTasks:
          response?.pendingTasks || 0,

        progress:
          response?.progress || 0,
      });

    } catch (err) {

      console.error(
        "Failed to refresh summary:",
        err
      );
    }
  };

  // =========================
  // REFRESH TODAY TASKS
  // =========================

  const refreshTodayTasks = async () => {

    try {

      const response =
        await TaskService.getTodayTasks();

      setTodayTasks(
        (response || [])
          .map(normalizeTask)
      );

    } catch (err) {

      console.error(
        "Failed to refresh today's tasks:",
        err
      );
    }
  };

  // =========================
  // DATE TASKS
  // =========================

  const getTasksByDate =
    async (date) => {

      try {

        const response =
          await TaskService.getTasksByDate(
            date
          );

        return (response || [])
          .map(normalizeTask);

      } catch (err) {

        console.error(
          "Failed to load tasks by date:",
          err
        );

        throw err;
      }
    };

  return (
    <TaskContext.Provider
      value={{
        tasks,

        todayTasks,

        summary,

        loading,

        error,

        totalTasks:
          summary.totalTasks,

        completedTasks:
          summary.completedTasks,

        pendingTasks:
          summary.pendingTasks,

        progress:
          summary.progress,

        addTask,

        deleteTask,

        updateTask,

        toggleTaskComplete,

        refreshSummary,

        refreshTodayTasks,

        getTasksByDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

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