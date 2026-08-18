import { useMemo, useState } from "react";

const useTaskFilters = (tasks) => {
  // ==========================================
  // FILTER STATES
  // ==========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("None");

  // ==========================================
  // FILTER + SORT
  // ==========================================

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        task.title
          ?.toLowerCase()
          .includes(search) ||
        task.category
          ?.toLowerCase()
          .includes(search) ||
        task.activities?.some((activity) =>
          activity
            .toLowerCase()
            .includes(search)
        );

      const matchesCategory =
        categoryFilter === "All"
          ? true
          : task.category ===
            categoryFilter;

      const matchesPriority =
        priorityFilter === "All"
          ? true
          : task.priority ===
            priorityFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority
      );
    });

    switch (sortBy) {
      case "Priority": {
        const order = {
          high: 1,
          High: 1,

          normal: 2,
          Medium: 2,

          low: 3,
          Low: 3,
        };

        filtered.sort(
          (a, b) =>
            (order[a.priority] ?? 99) -
            (order[b.priority] ?? 99)
        );
        break;
      }

      case "Title":
        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "Category":
        filtered.sort((a, b) =>
          a.category.localeCompare(
            b.category
          )
        );
        break;

      case "Newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );
        break;

      case "Time":
        filtered.sort((a, b) =>
          a.startTime.localeCompare(
            b.startTime
          )
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    tasks,
    searchTerm,
    categoryFilter,
    priorityFilter,
    sortBy,
  ]);

  // ==========================================
  // PUBLIC API
  // ==========================================

  return {
    searchTerm,
    setSearchTerm,

    categoryFilter,
    setCategoryFilter,

    priorityFilter,
    setPriorityFilter,

    sortBy,
    setSortBy,

    filteredTasks,
  };
};

export default useTaskFilters;