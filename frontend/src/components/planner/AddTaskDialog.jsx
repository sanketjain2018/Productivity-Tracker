import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const priorities = [
  {
    value: "High",
    label: "High",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Low",
    label: "Low",
  },
];

const AddTaskDialog = ({
  open,
  onClose,
  onSaveTask,
  selectedTask,
}) => {

  const [taskTitle, setTaskTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [taskDate, setTaskDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [priority, setPriority] =
    useState("Medium");

  const [titleError, setTitleError] =
    useState("");

  const [dateError, setDateError] =
    useState("");

  const isEditing =
    Boolean(selectedTask);

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setTaskTitle("");
    setDescription("");

    setTaskDate(
      new Date()
        .toISOString()
        .split("T")[0]
    );

    setPriority("Medium");

    setTitleError("");
    setDateError("");
  };

  // ==========================================
  // LOAD SELECTED TASK
  // ==========================================

  useEffect(() => {

    if (!open) {
      return;
    }

    if (selectedTask) {

      setTaskTitle(
        selectedTask.title || ""
      );

      setDescription(
        selectedTask.description || ""
      );

      setTaskDate(
        selectedTask.dueDate ||
        new Date()
          .toISOString()
          .split("T")[0]
      );

      setPriority(
        selectedTask.priority || "Medium"
      );

      setTitleError("");
      setDateError("");

    } else {

      resetForm();
    }

  }, [open, selectedTask]);

  // ==========================================
  // CLOSE
  // ==========================================

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // ==========================================
  // SAVE
  // ==========================================

  const handleSave = () => {

    let valid = true;

    if (!taskTitle.trim()) {

      setTitleError(
        "Task title is required"
      );

      valid = false;

    } else {

      setTitleError("");
    }

    if (!taskDate) {

      setDateError(
        "Due date is required"
      );

      valid = false;

    } else {

      setDateError("");
    }

    if (!valid) {
      return;
    }

    const taskData = {
      ...(selectedTask || {}),

      title: taskTitle.trim(),

      description:
        description.trim(),

      priority,

      dueDate: taskDate,

      status:
        selectedTask?.status ||
        "pending",
    };

    onSaveTask(taskData);

    resetForm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >

      {/* ====================================== */}
      {/* TITLE */}
      {/* ====================================== */}

      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          pb: 1.5,
        }}
      >

        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
          >
            {isEditing
              ? "Edit Task"
              : "Create New Task"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {isEditing
              ? "Update your task details"
              : "Add a new task to your planner"}
          </Typography>
        </Box>

        <IconButton
          onClick={handleClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>

      <Divider />

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <DialogContent
        sx={{
          pt: 3,
        }}
      >

        {/* TASK TITLE */}

        <TextField
          fullWidth
          label="Task Title"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(event) =>
            setTaskTitle(
              event.target.value
            )
          }
          error={Boolean(titleError)}
          helperText={
            titleError ||
            "Maximum 150 characters"
          }
          inputProps={{
            maxLength: 150,
          }}
          autoFocus
          sx={{ mb: 2.5 }}
        />

        {/* DESCRIPTION */}

        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          label="Description"
          placeholder="Add task description..."
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          inputProps={{
            maxLength: 1000,
          }}
          helperText="Optional"
          sx={{ mb: 2.5 }}
        />

        {/* DATE + PRIORITY */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >

          <TextField
            fullWidth
            type="date"
            label="Due Date"
            value={taskDate}
            onChange={(event) =>
              setTaskDate(
                event.target.value
              )
            }
            error={Boolean(dateError)}
            helperText={dateError}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth>
            <InputLabel>
              Priority
            </InputLabel>

            <Select
              value={priority}
              label="Priority"
              onChange={(event) =>
                setPriority(
                  event.target.value
                )
              }
            >

              {priorities.map(
                (item) => (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </MenuItem>
                )
              )}

            </Select>
          </FormControl>

        </Box>

      </DialogContent>

      <Divider />

      {/* ====================================== */}
      {/* ACTIONS */}
      {/* ====================================== */}

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
        }}
      >

        <Button
          onClick={handleClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={
            !isEditing ? (
              <AddIcon />
            ) : null
          }
          onClick={handleSave}
        >
          {isEditing
            ? "Update Task"
            : "Create Task"}
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default AddTaskDialog;