// ==========================================
// CONVERT 12-HOUR TIME TO MINUTES
// ==========================================

// The native HTML time input returns a 24-hour value (HH:mm).
// Store new tasks in the same 12-hour format as the existing task data.
export const formatTimeTo12Hour = (time) => {
  if (!time || typeof time !== "string") {
    return "";
  }

  const match = time.match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    return time;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return time;
  }

  const modifier = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${String(displayHours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")} ${modifier}`;
};

export const convertTimeToMinutes = (time) => {
  if (!time || typeof time !== "string") {
    return null;
  }

  const [timePart, modifier] =
    time.trim().split(/\s+/);

  if (!timePart || !modifier) {
    return null;
  }

  const [hourString, minuteString] =
    timePart.split(":");

  let hours = Number(hourString);
  const minutes = Number(minuteString);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return null;
  }

  const normalizedModifier =
    modifier.toUpperCase();

  if (
    normalizedModifier !== "AM" &&
    normalizedModifier !== "PM"
  ) {
    return null;
  }

  // 12:00 AM = 00:00
  if (
    normalizedModifier === "AM" &&
    hours === 12
  ) {
    hours = 0;
  }

  // 12:00 PM remains 12:00
  if (
    normalizedModifier === "PM" &&
    hours !== 12
  ) {
    hours += 12;
  }

  return hours * 60 + minutes;
};

// ==========================================
// CURRENT TIME IN MINUTES
// ==========================================

export const getTimeInMinutes = (
  date = new Date()
) => {
  return (
    date.getHours() * 60 +
    date.getMinutes()
  );
};

// ==========================================
// GET CURRENT + NEXT TASK
// ==========================================

export const getCurrentAndNextTask = (
  tasks,
  currentMinutes = getTimeInMinutes()
) => {
  if (!Array.isArray(tasks)) {
    return {
      currentTask: null,
      nextTask: null,
    };
  }

  let currentTask = null;
  let nextTask = null;

  for (const task of tasks) {
    const start =
      convertTimeToMinutes(
        task.startTime
      );

    let end =
      convertTimeToMinutes(
        task.endTime
      );

    if (
      start === null ||
      end === null
    ) {
      continue;
    }

    // Handles tasks such as:
    // 09:30 PM → 12:00 AM
    if (end <= start) {
      end += 24 * 60;
    }

    let adjustedCurrent =
      currentMinutes;

    /*
     * If the task crosses midnight and
     * current time is after midnight,
     * treat the current time as part of
     * the next-day continuation.
     */
    if (
      end > 24 * 60 &&
      currentMinutes < start
    ) {
      adjustedCurrent +=
        24 * 60;
    }

    if (
      adjustedCurrent >= start &&
      adjustedCurrent < end
    ) {
      currentTask = task;
      continue;
    }

    if (
      !nextTask &&
      start > currentMinutes
    ) {
      nextTask = task;
    }
  }

  // If we found a current task,
  // determine the first task after it.
  if (currentTask) {
    const currentIndex =
      tasks.findIndex(
        (task) =>
          task.id === currentTask.id
      );

    nextTask =
      tasks[currentIndex + 1] ||
      null;
  }

  return {
    currentTask,
    nextTask,
  };
};
