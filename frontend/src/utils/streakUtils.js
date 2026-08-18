import {
  getTaskHistory,
} from "./taskStorage";

// ==========================================
// FORMAT DATE AS YYYY-MM-DD
// ==========================================

const formatDateKey = (date) => {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// ==========================================
// CHECK WHETHER A DAY WAS ACTIVE
// ==========================================

const hasCompletedTask = (
  dailyProgress
) => {
  if (
    !dailyProgress ||
    typeof dailyProgress !== "object"
  ) {
    return false;
  }

  return Object.values(
    dailyProgress
  ).some(
    (status) =>
      status === "completed"
  );
};

// ==========================================
// CALCULATE CURRENT STREAK
// ==========================================

export const calculateCurrentStreak = (
  currentDate = new Date()
) => {
  const history =
    getTaskHistory();

  if (
    !history ||
    Object.keys(history).length === 0
  ) {
    return 0;
  }

  let streak = 0;

  const date =
    new Date(currentDate);

  /*
   * If today has not yet had a completed
   * task, start checking from yesterday.
   *
   * This prevents the streak from becoming
   * 0 every morning before the user has had
   * time to complete today's first task.
   */

  const todayKey =
    formatDateKey(date);

  if (
    !hasCompletedTask(
      history[todayKey]
    )
  ) {
    date.setDate(
      date.getDate() - 1
    );
  }

  // Count consecutive active days.

  while (true) {
    const dateKey =
      formatDateKey(date);

    if (
      hasCompletedTask(
        history[dateKey]
      )
    ) {
      streak += 1;

      date.setDate(
        date.getDate() - 1
      );
    } else {
      break;
    }
  }

  return streak;
};