import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";

import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";

// ==========================================
// SINGLE SUMMARY CARD
// ==========================================

const SummaryCard = ({
  icon,
  title,
  value,
  subtitle,
  progress,
  iconColor,
}) => {
  const hasProgress =
    typeof progress === "number";

  return (
    <Card
      sx={{
        height: "100%",

        position: "relative",

        overflow: "hidden",

        border: "1px solid",

        borderColor: "divider",

        borderRadius: 1.5,

        backgroundColor:
          "background.paper",

        boxShadow: "none",

        transition:
          "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform:
            "translateY(-2px)",

          borderColor:
            iconColor,

          boxShadow:
            "0 8px 24px rgba(15, 23, 42, 0.07)",
        },
      }}
    >
      {/* ====================================== */}
      {/* TOP ACCENT */}
      {/* ====================================== */}

      <Box
        sx={{
          position: "absolute",

          top: 0,

          left: 0,

          width: "100%",

          height: 2,

          backgroundColor:
            iconColor,
        }}
      />

      <CardContent
        sx={{
          p: {
            xs: 1.75,
            sm: 2,
          },

          "&:last-child": {
            pb: {
              xs: 1.75,
              sm: 2,
            },
          },
        }}
      >
        {/* ==================================== */}
        {/* HEADER */}
        {/* ==================================== */}

        <Box
          sx={{
            display: "flex",

            alignItems:
              "flex-start",

            justifyContent:
              "space-between",

            gap: 1.5,
          }}
        >
          {/* TITLE + VALUE */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "9px",
                  sm: "10px",
                },

                fontWeight: 700,

                color:
                  "text.secondary",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.055em",

                lineHeight: 1.4,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.65,

                fontSize: {
                  xs: "24px",
                  sm: "26px",
                },

                fontWeight: 700,

                lineHeight: 1.1,

                letterSpacing:
                  "-0.025em",

                color:
                  "text.primary",
              }}
            >
              {value}
            </Typography>
          </Box>

          {/* ICON */}

          <Box
            sx={{
              width: 36,

              height: 36,

              flexShrink: 0,

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              borderRadius: 1,

              backgroundColor:
                "action.hover",

              color: iconColor,
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* ==================================== */}
        {/* PROGRESS */}
        {/* ==================================== */}

        {hasProgress && (
          <Box
            sx={{
              mt: 1.75,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={Math.min(
                100,
                Math.max(
                  0,
                  progress
                )
              )}
              sx={{
                height: 4,

                borderRadius: 4,

                backgroundColor:
                  "action.hover",

                "& .MuiLinearProgress-bar":
                  {
                    borderRadius: 4,

                    backgroundColor:
                      iconColor,
                  },
              }}
            />
          </Box>
        )}

        {/* ==================================== */}
        {/* FOOTER */}
        {/* ==================================== */}

        <Typography
          sx={{
            mt: hasProgress
              ? 1.1
              : 1.5,

            fontSize: "10px",

            color:
              "text.secondary",

            lineHeight: 1.4,

            whiteSpace:
              "nowrap",

            overflow: "hidden",

            textOverflow:
              "ellipsis",
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

// ==========================================
// DASHBOARD SUMMARY CARDS
// ==========================================

const DashboardSummaryCards = ({
  progress,
  completedTasks,
  pendingTasks,
  streak,
}) => {
  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",

          sm:
            "repeat(2, minmax(0, 1fr))",

          lg:
            "repeat(4, minmax(0, 1fr))",
        },

        gap: {
          xs: 1.5,
          sm: 2,
        },

        mb: 3,
      }}
    >
      {/* ==================================== */}
      {/* TODAY'S PROGRESS */}
      {/* ==================================== */}

      <SummaryCard
        icon={
          <TrackChangesOutlinedIcon
            sx={{
              fontSize: 19,
            }}
          />
        }
        title="Today's Progress"
        value={`${progress}%`}
        subtitle={
          progress === 100
            ? "All tasks completed"
            : "Daily completion"
        }
        progress={progress}
        iconColor="primary.main"
      />

      {/* ==================================== */}
      {/* COMPLETED */}
      {/* ==================================== */}

      <SummaryCard
        icon={
          <CheckCircleOutlineOutlinedIcon
            sx={{
              fontSize: 19,
            }}
          />
        }
        title="Completed"
        value={completedTasks}
        subtitle={
          completedTasks === 1
            ? "Task finished today"
            : "Tasks finished today"
        }
        iconColor="success.main"
      />

      {/* ==================================== */}
      {/* PENDING */}
      {/* ==================================== */}

      <SummaryCard
        icon={
          <ScheduleOutlinedIcon
            sx={{
              fontSize: 19,
            }}
          />
        }
        title="Pending"
        value={pendingTasks}
        subtitle={
          pendingTasks === 1
            ? "Task remaining"
            : "Tasks remaining"
        }
        iconColor="warning.main"
      />

      {/* ==================================== */}
      {/* STREAK */}
      {/* ==================================== */}

      <SummaryCard
        icon={
          <LocalFireDepartmentOutlinedIcon
            sx={{
              fontSize: 19,
            }}
          />
        }
        title="Current Streak"
        value={streak}
        subtitle={
          streak === 1
            ? "Day in a row"
            : "Days in a row"
        }
        iconColor="error.main"
      />
    </Box>
  );
};

export default DashboardSummaryCards;