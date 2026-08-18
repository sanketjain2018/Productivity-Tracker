import { useState } from "react";

import { Box } from "@mui/material";

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
  // LOAD TASKS
  // ==========================================

  const { tasks } = useTasks();

  // ==========================================
  // DAY CLICK
  // ==========================================

  const handleDayClick = (day) => {
    // YYYY-MM-DD

    const clickedDate = `${currentYear}-${String(
      currentMonth + 1
    ).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

    setSelectedDate(clickedDate);

    // Filter tasks for selected day

    const dayTasks = tasks.filter(
      (task) => task.taskDate === clickedDate
    );

    setSelectedTasks(dayTasks);

    setOpenDialog(true);
  };

  // ==========================================
  // CLOSE DIALOG
  // ==========================================

  const handleCloseDialog = () => {
    setOpenDialog(false);
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