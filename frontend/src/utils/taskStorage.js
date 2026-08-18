const STORAGE_KEY = "productivityTracker_dailyProgress";

/**
 * Returns today's date in local YYYY-MM-DD format.
 *
 * We intentionally don't use:
 * new Date().toISOString().split("T")[0]
 *
 * because toISOString() uses UTC and can produce the wrong
 * date around midnight for local users.
 */
export const getTodayDateKey = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Read all saved daily progress.
 */
export const getAllTaskProgress = () => {
  try {
    const storedData =
      localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return {};
    }

    const parsedData =
      JSON.parse(storedData);

    if (
      parsedData === null ||
      typeof parsedData !== "object" ||
      Array.isArray(parsedData)
    ) {
      return {};
    }

    return parsedData;
  } catch (error) {
    console.error(
      "Unable to read task progress:",
      error
    );

    return {};
  }
};

/**
 * Get task statuses for a particular date.
 */
export const getTaskProgressByDate = (
  dateKey
) => {
  const allProgress =
    getAllTaskProgress();

  return allProgress[dateKey] || {};
};

/**
 * Save task statuses for a particular date.
 */
export const saveTaskProgressByDate = (
  dateKey,
  tasks
) => {
  try {
    const allProgress =
      getAllTaskProgress();

    const taskStatuses =
      tasks.reduce(
        (result, task) => {
          result[task.id] =
            task.status;

          return result;
        },
        {}
      );

    const updatedProgress = {
      ...allProgress,

      [dateKey]: taskStatuses,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProgress)
    );
  } catch (error) {
    console.error(
      "Unable to save task progress:",
      error
    );
  }
};

/**
 * Remove all saved task progress.
 *
 * We won't use this on the Dashboard yet,
 * but it will be useful later in Settings.
 */
export const clearAllTaskProgress = () => {
  try {
    localStorage.removeItem(
      STORAGE_KEY
    );
  } catch (error) {
    console.error(
      "Unable to clear task progress:",
      error
    );
  }
};

// ==========================================
// GET ALL SAVED DAILY PROGRESS
// ==========================================

export const getTaskHistory = () => {
  return getAllTaskProgress();
};
