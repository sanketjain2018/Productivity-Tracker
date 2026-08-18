import {  useState } from "react";

import dailyTasks from "../data/dailyTasks";

import {
  getTodayDateKey,
  getTaskProgressByDate,
  saveTaskProgressByDate,
} from "../utils/taskStorage";

// ==========================================
// CREATE INITIAL TASK STATE
// ==========================================

const createInitialTasks = () => {
  const todayKey = getTodayDateKey();

  const savedProgress =
    getTaskProgressByDate(todayKey);

  return dailyTasks.map((task) => ({
    ...task,

    status:
      savedProgress[task.id] === "completed"
        ? "completed"
        : "pending",
  }));
};

// ==========================================
// DAILY TASK HOOK
// ==========================================

const useDailyTasks = () => {
  const todayKey = getTodayDateKey();

  const [tasks, setTasks] =
    useState(createInitialTasks);

  // ========================================
  // SAVE CHANGES
  // ========================================

  useEffect(() => {
    saveTaskProgressByDate(
      todayKey,
      tasks
    );
  }, [tasks, todayKey]);

  // ========================================
  // DONE / UNDO
  // ========================================

const toggleTaskComplete = (taskId) => {
  setTasks((previousTasks) => {
    const updatedTasks =
      previousTasks.map((task) =>
        task.id === taskId
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

    saveTaskProgressByDate(
      todayKey,
      updatedTasks
    );

    return updatedTasks;
  });
};

  // ========================================
  // STATISTICS
  // ========================================

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) *
            100
        );

  // ========================================
  // RETURN PUBLIC API
  // ========================================

  return {
    tasks,

    totalTasks,
    completedTasks,
    pendingTasks,
    progress,

    toggleTaskComplete,
  };
};

export default useDailyTasks;