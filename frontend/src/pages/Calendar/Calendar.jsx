import { useState } from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import useCalendar from "../../hooks/useCalendar";
import useTasks from "../../hooks/useTasks";

import CalendarToolbar from "../../components/calendar/CalendarToolbar";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import CalendarTaskDialog from "../../components/calendar/CalendarTaskDialog";

const Calendar = () => {

  // ==========================================
  // DIALOG STATE
  // ==========================================

  const [openDialog, setOpenDialog] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTasks, setSelectedTasks] =
    useState([]);

  const [loadingDateTasks, setLoadingDateTasks] =
    useState(false);

  // ==========================================
  // CALENDAR HOOK
  // ==========================================

  const {
    currentMonth,
    currentYear,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
  } = useCalendar();

  // ==========================================
  // TASKS
  // ==========================================

  const {
    tasks,
    getTasksByDate,
  } = useTasks();

  // ==========================================
  // DAY CLICK
  // ==========================================

  const handleDayClick = async (day) => {

    const clickedDate =
      `${currentYear}-${String(
        currentMonth + 1
      ).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`;

    setSelectedDate(clickedDate);

    setOpenDialog(true);

    setLoadingDateTasks(true);

    try {

      const dayTasks =
        await getTasksByDate(
          clickedDate
        );

      setSelectedTasks(
        dayTasks || []
      );

    } catch (error) {

      console.error(
        "Failed to load tasks for selected date:",
        error
      );

      setSelectedTasks([]);

    } finally {

      setLoadingDateTasks(false);
    }
  };

  // ==========================================
  // CLOSE DIALOG
  // ==========================================

  const handleCloseDialog = () => {

    setOpenDialog(false);

    setSelectedDate("");

    setSelectedTasks([]);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <Box>

      {/* ====================================== */}
      {/* CALENDAR TOOLBAR */}
      {/* ====================================== */}

      <CalendarToolbar
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />

      {/* ====================================== */}
      {/* CALENDAR GRID */}
      {/* ====================================== */}

      <CalendarGrid
        currentMonth={currentMonth}
        currentYear={currentYear}
        onDayClick={handleDayClick}
        tasks={tasks}
      />

      {/* ====================================== */}
      {/* LOADING */}
      {/* ====================================== */}

      {loadingDateTasks && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            py: 2,
          }}
        >
          <CircularProgress size={20} />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Loading tasks...
          </Typography>
        </Box>
      )}

      {/* ====================================== */}
      {/* TASK DIALOG */}
      {/* ====================================== */}

      <CalendarTaskDialog
        open={openDialog}
        selectedDate={selectedDate}
        tasks={selectedTasks}
        onClose={handleCloseDialog}
      />

    </Box>
  );
};

export default Calendar;