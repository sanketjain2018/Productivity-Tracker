import { useState } from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";

import { toast } from "react-toastify";

import useTaskFilters from "../../hooks/useTaskFilters";
import useTasks from "../../hooks/useTasks";

import PlannerTaskCard from "../../components/planner/PlannerTaskCard";
import PlannerToolbar from "../../components/planner/PlannerToolbar";
import AddTaskDialog from "../../components/planner/AddTaskDialog";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";
import PlannerStats from "../../components/planner/PlannerStats";

// ==========================================
// PLANNER
// ==========================================

const Planner = () => {
  // ==========================================
  // LOAD TASKS
  // ==========================================

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  // ==========================================
  // ADD / EDIT DIALOG
  // ==========================================

  const [openDialog, setOpenDialog] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  // ==========================================
  // DELETE DIALOG
  // ==========================================

  const [
    deleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

  const [taskToDelete, setTaskToDelete] =
    useState(null);

  // ==========================================
  // FILTERS
  // ==========================================

  const {
    searchTerm,
    setSearchTerm,

    categoryFilter,
    setCategoryFilter,

    priorityFilter,
    setPriorityFilter,

    sortBy,
    setSortBy,

    filteredTasks,
  } = useTaskFilters(tasks);

  // ==========================================
  // OPEN ADD DIALOG
  // ==========================================

  const handleOpenDialog = () => {
    setSelectedTask(null);

    setOpenDialog(true);
  };

  // ==========================================
  // OPEN EDIT DIALOG
  // ==========================================

  const handleEditTask = (task) => {
    setSelectedTask(task);

    setOpenDialog(true);
  };

  // ==========================================
  // CLOSE ADD / EDIT DIALOG
  // ==========================================

  const handleCloseDialog = () => {
    setOpenDialog(false);

    setSelectedTask(null);
  };

  // ==========================================
  // SAVE TASK
  // ==========================================

  const handleSaveTask = async (task) => {
  try {

    if (selectedTask) {

      await updateTask(task);

      toast.success(
        "Task updated successfully!"
      );

    } else {

      await addTask(task);

      toast.success(
        "Task added successfully!"
      );
    }

    handleCloseDialog();

  } catch (error) {

    toast.error(
      error.message ||
      "Unable to save task."
    );
  }
};

  // ==========================================
  // OPEN DELETE DIALOG
  // ==========================================

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);

    setDeleteDialogOpen(true);
  };

  // ==========================================
  // CONFIRM DELETE
  // ==========================================

  const confirmDeleteTask = async () => {

  if (!taskToDelete) {
    return;
  }

  try {

    const deleted =
      await deleteTask(
        taskToDelete.id
      );

    if (deleted) {

      toast.success(
        "Task deleted successfully!"
      );

    } else {

      toast.error(
        "Unable to delete task."
      );
    }

  } catch (error) {

    toast.error(
      error.message ||
      "Unable to delete task."
    );

  } finally {

    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  }
};

  // ==========================================
  // CLOSE DELETE DIALOG
  // ==========================================

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);

    setTaskToDelete(null);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <Box
      sx={{
        width: "100%",

        maxWidth: 1600,

        mx: "auto",
      }}
    >
      {/* ====================================== */}
      {/* PAGE HEADER */}
      {/* ====================================== */}

      <Box
        sx={{
          mb: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems: {
              xs: "flex-start",
              sm: "center",
            },

            justifyContent:
              "space-between",

            gap: 2,

            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Box>
            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "24px",
                  sm: "28px",
                },

                fontWeight: 700,

                lineHeight: 1.2,

                letterSpacing:
                  "-0.02em",

                color:
                  "text.primary",
              }}
            >
              Planner
            </Typography>

            <Typography
              sx={{
                mt: 0.6,

                fontSize: "12px",

                color:
                  "text.secondary",

                lineHeight: 1.5,
              }}
            >
              Organize your tasks,
              priorities, and schedule.
            </Typography>
          </Box>

          {/* TASK COUNT */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 0.8,

              px: 1.25,

              py: 0.7,

              borderRadius: 1,

              backgroundColor:
                "action.hover",

              color:
                "text.secondary",
            }}
          >
            <AddTaskOutlinedIcon
              sx={{
                fontSize: 16,

                color:
                  "primary.main",
              }}
            />

            <Typography
              sx={{
                fontSize: "11px",

                fontWeight: 600,
              }}
            >
              {filteredTasks.length}{" "}
              {filteredTasks.length ===
              1
                ? "task"
                : "tasks"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ====================================== */}
      {/* TOOLBAR */}
      {/* ====================================== */}

      <PlannerToolbar
        totalTasks={
          filteredTasks.length
        }
        onAddTask={
          handleOpenDialog
        }
        searchTerm={searchTerm}
        onSearchChange={
          setSearchTerm
        }
        categoryFilter={
          categoryFilter
        }
        onCategoryChange={
          setCategoryFilter
        }
        priorityFilter={
          priorityFilter
        }
        onPriorityChange={
          setPriorityFilter
        }
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* ====================================== */}
      {/* STATISTICS */}
      {/* ====================================== */}

      <PlannerStats
        tasks={filteredTasks}
      />

      {/* ====================================== */}
      {/* TASK SECTION HEADER */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "flex",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          justifyContent:
            "space-between",

          gap: 1,

          mb: 1.75,

          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              fontSize: "16px",

              fontWeight: 700,

              color:
                "text.primary",
            }}
          >
            Your Tasks
          </Typography>

          <Typography
            sx={{
              mt: 0.3,

              fontSize: "11px",

              color:
                "text.secondary",
            }}
          >
            Manage and organize your
            daily work.
          </Typography>
        </Box>

        {filteredTasks.length >
          0 && (
          <Typography
            sx={{
              fontSize: "10px",

              color:
                "text.secondary",

              fontWeight: 500,
            }}
          >
            Showing{" "}
            {filteredTasks.length}{" "}
            of {tasks.length}
          </Typography>
        )}
      </Box>

      {/* ====================================== */}
      {/* TASK GRID */}
      {/* ====================================== */}

      {filteredTasks.length > 0 ? (
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",

              sm:
                "repeat(2, minmax(0, 1fr))",

              xl:
                "repeat(3, minmax(0, 1fr))",
            },

            gap: 2,

            alignItems: "stretch",
          }}
        >
          {filteredTasks.map(
            (task) => (
              <PlannerTaskCard
                key={task.id}
                task={task}
                onEdit={
                  handleEditTask
                }
                onDelete={
                  handleDeleteTask
                }
              />
            )
          )}
        </Box>
      ) : (
        /* ==================================== */
        /* EMPTY STATE */
        /* ==================================== */

        <Box
          sx={{
            minHeight: 260,

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            textAlign: "center",

            border: "1px dashed",

            borderColor:
              "divider",

            borderRadius: 1.5,

            backgroundColor:
              "background.paper",

            px: 3,
          }}
        >
          <Box>
            <Box
              sx={{
                width: 42,

                height: 42,

                mx: "auto",

                mb: 1.25,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius: 1,

                backgroundColor:
                  "action.hover",

                color:
                  "text.secondary",
              }}
            >
              <AddTaskOutlinedIcon
                sx={{
                  fontSize: 21,
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "14px",

                fontWeight: 600,

                color:
                  "text.primary",
              }}
            >
              No matching tasks
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: "11px",

                color:
                  "text.secondary",

                maxWidth: 320,
              }}
            >
              Try changing your
              search or filters, or
              create a new task.
            </Typography>
          </Box>
        </Box>
      )}

      {/* ====================================== */}
      {/* ADD / EDIT TASK DIALOG */}
      {/* ====================================== */}

      <AddTaskDialog
        open={openDialog}
        onClose={
          handleCloseDialog
        }
        onSaveTask={
          handleSaveTask
        }
        selectedTask={
          selectedTask
        }
      />

      {/* ====================================== */}
      {/* DELETE CONFIRM DIALOG */}
      {/* ====================================== */}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        task={taskToDelete}
        onClose={
          closeDeleteDialog
        }
        onConfirm={
          confirmDeleteTask
        }
      />
    </Box>
  );
};

export default Planner;