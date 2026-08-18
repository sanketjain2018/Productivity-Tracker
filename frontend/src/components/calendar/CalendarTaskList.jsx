import {
  Box,
  Typography,
} from "@mui/material";

import CalendarTaskItem from "./CalendarTaskItem";

// ==========================================
// CALENDAR TASK LIST
// ==========================================

const CalendarTaskList = ({
  tasks = [],
}) => {
  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          py: 2,

          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "11px",

            color:
              "text.secondary",
          }}
        >
          No tasks available.
        </Typography>
      </Box>
    );
  }

  // ==========================================
  // TASK LIST
  // ==========================================

  return (
    <Box
      sx={{
        display: "flex",

        flexDirection:
          "column",

        gap: 1,
      }}
    >
      {tasks.map((task) => (
        <CalendarTaskItem
          key={task.id}
          task={task}
        />
      ))}
    </Box>
  );
};

export default CalendarTaskList;