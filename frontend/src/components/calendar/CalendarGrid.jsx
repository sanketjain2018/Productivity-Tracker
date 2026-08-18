import {
  Box,
  Typography,
} from "@mui/material";

import CalendarDayCard from "./CalendarDayCard";

import {
  WEEK_DAYS,
  generateCalendarDays,
} from "../../utils/calendarUtils";

// ==========================================
// CALENDAR GRID
// ==========================================

const CalendarGrid = ({
  currentMonth,
  currentYear,
  onDayClick,
  tasks = [],
}) => {
  // ==========================================
  // GENERATE CALENDAR DAYS
  // ==========================================

  const calendarDays =
    generateCalendarDays(
      currentYear,
      currentMonth
    );

  // ==========================================
  // GET TASKS FOR DAY
  // ==========================================

  const getDayTasks = (day) => {
    if (!day) {
      return [];
    }

    const formattedDate =
      `${currentYear}-${String(
        currentMonth + 1
      ).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

    return tasks.filter(
      (task) =>
        task.taskDate ===
        formattedDate
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <Box
      sx={{
        width: "100%",

        minWidth: 0,

        border: "1px solid",

        borderColor: "divider",

        borderRadius: 1.5,

        overflow: "hidden",

        backgroundColor:
          "background.paper",
      }}
    >
      {/* ====================================== */}
      {/* WEEK HEADERS */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(7, minmax(0, 1fr))",

          borderBottom:
            "1px solid",

          borderColor:
            "divider",

          backgroundColor:
            "action.hover",
        }}
      >
        {WEEK_DAYS.map(
          (day, index) => (
            <Box
              key={day}
              sx={{
                minWidth: 0,

                px: {
                  xs: 0.5,
                  sm: 1,
                },

                py: {
                  xs: 1,
                  sm: 1.25,
                },

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRight:
                  index <
                  WEEK_DAYS.length -
                    1
                    ? "1px solid"
                    : "none",

                borderColor:
                  "divider",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "9px",
                    sm: "10px",
                    md: "11px",
                  },

                  fontWeight: 700,

                  color:
                    "text.secondary",

                  textTransform:
                    "uppercase",

                  letterSpacing:
                    "0.05em",

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",

                  whiteSpace:
                    "nowrap",
                }}
              >
                {day}
              </Typography>
            </Box>
          )
        )}
      </Box>

      {/* ====================================== */}
      {/* CALENDAR DAYS */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(7, minmax(0, 1fr))",

          width: "100%",
        }}
      >
        {calendarDays.map(
          (day, index) => (
            <Box
              key={`${day ?? "empty"}-${index}`}
              sx={{
                minWidth: 0,

                borderRight:
                  (index + 1) % 7 !==
                  0
                    ? "1px solid"
                    : "none",

                borderBottom:
                  index <
                  calendarDays.length -
                    7
                    ? "1px solid"
                    : "none",

                borderColor:
                  "divider",
              }}
            >
              <CalendarDayCard
                day={day}
                currentMonth={
                  currentMonth
                }
                currentYear={
                  currentYear
                }
                onClick={
                  onDayClick
                }
                tasks={getDayTasks(
                  day
                )}
              />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default CalendarGrid;