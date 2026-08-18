import {
  Box,
  Typography,
} from "@mui/material";

import { isToday } from "../../utils/calendarUtils";

const CalendarDayCard = ({
  day,
  currentMonth,
  currentYear,
  onClick,
  tasks = [],
}) => {
  // ==========================================
  // EMPTY CELL
  // ==========================================

  if (!day) {
    return (
      <Box
        sx={{
          height: {
            xs: 65,
            sm: 85,
            md: 110,
          },

          borderRadius: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },

          bgcolor: "transparent",
        }}
      />
    );
  }

  // ==========================================
  // CHECK TODAY
  // ==========================================

  const today = isToday(
    currentYear,
    currentMonth,
    day
  );

  // ==========================================
  // TASK PREVIEW
  // ==========================================

  const previewTasks = tasks.slice(0, 3);

  const remainingTasks =
    tasks.length - previewTasks.length;

  // ==========================================
  // UI
  // ==========================================

  return (
    <Box
      onClick={() => onClick(day)}
      sx={{
        width: "100%",
        minWidth: 0,

        height: {
          xs: 65,
          sm: 85,
          md: 110,
        },

        boxSizing: "border-box",

        borderRadius: {
          xs: 1.5,
          sm: 2,
          md: 3,
        },

        border: "1px solid",

        borderColor: today
          ? "primary.main"
          : "divider",

        bgcolor: today
          ? "primary.light"
          : "background.paper",

        cursor: "pointer",

        transition:
          "transform 0.2s ease, box-shadow 0.2s ease",

        p: {
          xs: 0.6,
          sm: 1,
          md: 2,
        },

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between",

        overflow: "hidden",

        "&:hover": {
          transform: {
            xs: "none",
            sm: "translateY(-3px)",
          },

          boxShadow: {
            xs: 1,
            sm: 4,
          },
        },
      }}
    >
      {/* ====================================== */}
      {/* DAY NUMBER */}
      {/* ====================================== */}

      <Typography
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "0.8rem",
            sm: "1rem",
            md: "1.25rem",
          },

          lineHeight: 1,
        }}
      >
        {day}
      </Typography>

      {/* ====================================== */}
      {/* TODAY */}
      {/* ====================================== */}

      {today && (
        <Typography
          color="primary"
          fontWeight="bold"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },

            fontSize: "0.7rem",
          }}
        >
          Today
        </Typography>
      )}

      {/* ====================================== */}
      {/* MOBILE TASK INDICATOR */}
      {/* ====================================== */}

      {tasks.length > 0 && (
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "none",
            },

            alignItems: "center",

            justifyContent: "center",

            mt: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            • {tasks.length}
          </Typography>
        </Box>
      )}

      {/* ====================================== */}
      {/* DESKTOP TASK PREVIEW */}
      {/* ====================================== */}

      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },

          minWidth: 0,
        }}
      >
        {previewTasks.map((task) => (
          <Typography
            key={task.id}
            variant="caption"
            noWrap
            sx={{
              display: "block",

              fontSize: {
                sm: "0.65rem",
                md: "0.72rem",
              },

              lineHeight: 1.5,

              overflow: "hidden",

              textOverflow: "ellipsis",
            }}
          >
            {task.icon} {task.title}
          </Typography>
        ))}

        {remainingTasks > 0 && (
          <Typography
            variant="caption"
            color="primary"
            fontWeight="bold"
            sx={{
              fontSize: {
                sm: "0.65rem",
                md: "0.72rem",
              },
            }}
          >
            +{remainingTasks} more
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CalendarDayCard;