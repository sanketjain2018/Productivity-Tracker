import { useMemo, useState } from "react";

const useTaskSorting = (tasks) => {
  // ==========================================
  // SORT STATE
  // ==========================================

  const [sortBy, setSortBy] =
    useState("default");

  // ==========================================
  // SORTED TASKS
  // ==========================================

  const sortedTasks = useMemo(() => {
    const sorted = [...tasks];

    switch (sortBy) {
      case "title":
        sorted.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "category":
        sorted.sort((a, b) =>
          a.category.localeCompare(
            b.category
          )
        );
        break;

      case "priority":
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
          high: 1,
          normal: 2,
          low: 3,
        };

        sorted.sort(
          (a, b) =>
            priorityOrder[a.priority] -
            priorityOrder[b.priority]
        );
        break;

      case "time":
        sorted.sort((a, b) =>
          a.startTime.localeCompare(
            b.startTime
          )
        );
        break;

      default:
        break;
    }

    return sorted;
  }, [tasks, sortBy]);

  return {
    sortBy,
    setSortBy,
    sortedTasks,
  };
};

export default useTaskSorting;