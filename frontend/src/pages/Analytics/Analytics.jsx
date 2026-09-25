import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import useTasks from "../../hooks/useTasks";

// ==========================================
// ANALYTICS PAGE
// ==========================================

const Analytics = () => {
  const {
    tasks,
    totalTasks,
    completedTasks,
    pendingTasks,
    progress,
  } = useTasks();

  // ==========================================
  // STATUS ANALYTICS
  // ==========================================

  const statusCounts = tasks.reduce(
    (result, task) => {
      const status =
        task.status === "completed"
          ? "Completed"
          : "Pending";

      result[status] =
        (result[status] || 0) + 1;

      return result;
    },
    {}
  );

  // ==========================================
  // PRIORITY ANALYTICS
  // ==========================================

  const priorityCounts = tasks.reduce(
    (result, task) => {
      const priority =
        task.priority || "Other";

      result[priority] =
        (result[priority] || 0) + 1;

      return result;
    },
    {}
  );

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
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems: {
              xs: "flex-start",
              sm: "center",
            },

            justifyContent: "space-between",

            gap: 2,

            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          {/* TITLE */}

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

                letterSpacing: "-0.02em",

                color: "text.primary",
              }}
            >
              Analytics
            </Typography>

            <Typography
              sx={{
                mt: 0.6,

                fontSize: "12px",

                color: "text.secondary",

                lineHeight: 1.5,
              }}
            >
              Understand your productivity,
              task distribution, and
              completion progress.
            </Typography>
          </Box>

          {/* OVERALL STATUS */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 0.8,

              px: 1.25,

              py: 0.7,

              borderRadius: 1,

              backgroundColor: "action.hover",
            }}
          >
            <TrendingUpRoundedIcon
              sx={{
                fontSize: 16,

                color: "primary.main",
              }}
            />

            <Typography
              sx={{
                fontSize: "11px",

                fontWeight: 600,

                color: "text.secondary",
              }}
            >
              {progress}% complete
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ====================================== */}
      {/* OVERVIEW CARDS */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            sm: "repeat(2, minmax(0, 1fr))",

            lg: "repeat(4, minmax(0, 1fr))",
          },

          gap: 2,

          mb: 3,
        }}
      >
        <AnalyticsCard
          title="Total Tasks"
          value={totalTasks}
          subtitle="Tasks in your planner"
          icon={<AssignmentOutlinedIcon />}
          iconColor="primary.main"
        />

        <AnalyticsCard
          title="Completed"
          value={completedTasks}
          subtitle="Tasks finished"
          icon={<CheckCircleOutlineRoundedIcon />}
          iconColor="success.main"
        />

        <AnalyticsCard
          title="Pending"
          value={pendingTasks}
          subtitle="Tasks remaining"
          icon={<ScheduleOutlinedIcon />}
          iconColor="warning.main"
        />

        <AnalyticsCard
          title="Completion Rate"
          value={`${progress}%`}
          subtitle={
            progress === 100
              ? "Everything completed"
              : "Overall task completion"
          }
          icon={<TrackChangesOutlinedIcon />}
          iconColor="primary.main"
          progress={progress}
        />
      </Box>

      {/* ====================================== */}
      {/* ANALYTICS CONTENT */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            lg: "repeat(2, minmax(0, 1fr))",
          },

          gap: 2,
        }}
      >
        {/* STATUS */}

        <AnalyticsListCard
          title="Tasks by Status"
          subtitle="Current completion status"
          icon={<CheckCircleOutlineRoundedIcon />}
          data={statusCounts}
          total={totalTasks}
          type="status"
        />

        {/* PRIORITY */}

        <AnalyticsListCard
          title="Tasks by Priority"
          subtitle="Distribution across priority levels"
          icon={<FlagOutlinedIcon />}
          data={priorityCounts}
          total={totalTasks}
          type="priority"
        />
      </Box>
    </Box>
  );
};

// ==========================================
// ANALYTICS CARD
// ==========================================

const AnalyticsCard = ({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  progress,
}) => {
  return (
    <Card
      sx={{
        height: "100%",

        position: "relative",

        overflow: "hidden",

        border: "1px solid",

        borderColor: "divider",

        borderRadius: 1.5,

        backgroundColor: "background.paper",

        boxShadow: "none",

        transition:
          "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",

          borderColor: iconColor,

          boxShadow:
            "0 8px 24px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      {/* TOP ACCENT */}

      <Box
        sx={{
          position: "absolute",

          top: 0,

          left: 0,

          right: 0,

          height: 2,

          backgroundColor: iconColor,
        }}
      />

      <CardContent
        sx={{
          p: 2.25,

          "&:last-child": {
            pb: 2.25,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems: "flex-start",

            justifyContent: "space-between",

            gap: 2,
          }}
        >
          {/* TEXT */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",

                fontWeight: 600,

                color: "text.secondary",

                textTransform: "uppercase",

                letterSpacing: "0.06em",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.75,

                fontSize: "28px",

                fontWeight: 700,

                lineHeight: 1.1,

                letterSpacing: "-0.02em",

                color: "text.primary",
              }}
            >
              {value}
            </Typography>
          </Box>

          {/* ICON */}

          <Box
            sx={{
              width: 38,

              height: 38,

              flexShrink: 0,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              borderRadius: 1,

              backgroundColor: "action.hover",

              color: iconColor,
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* PROGRESS */}

        {typeof progress === "number" && (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 4,

                borderRadius: 4,

                backgroundColor: "action.hover",

                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,

                  backgroundColor: iconColor,
                },
              }}
            />
          </Box>
        )}

        {/* SUBTITLE */}

        <Typography
          sx={{
            mt:
              typeof progress === "number"
                ? 1.25
                : 2,

            fontSize: "10px",

            color: "text.secondary",

            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

// ==========================================
// ANALYTICS LIST CARD
// ==========================================

const AnalyticsListCard = ({
  title,
  subtitle,
  icon,
  data,
  total,
  type,
}) => {
  const entries = Object.entries(data);

  return (
    <Card
      sx={{
        border: "1px solid",

        borderColor: "divider",

        borderRadius: 1.5,

        boxShadow: "none",

        backgroundColor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          p: 2.5,

          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        {/* CARD HEADER */}

        <Box
          sx={{
            display: "flex",

            alignItems: "flex-start",

            justifyContent: "space-between",

            gap: 2,

            mb: 2.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "14px",

                fontWeight: 700,

                color: "text.primary",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.4,

                fontSize: "10px",

                color: "text.secondary",
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 34,

              height: 34,

              flexShrink: 0,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              borderRadius: 1,

              backgroundColor: "action.hover",

              color: "primary.main",
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* DATA */}

        {entries.length === 0 ? (
          <Box
            sx={{
              py: 4,

              textAlign: "center",

              border: "1px dashed",

              borderColor: "divider",

              borderRadius: 1.25,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",

                fontWeight: 600,

                color: "text.primary",
              }}
            >
              No data available
            </Typography>

            <Typography
              sx={{
                mt: 0.4,

                fontSize: "10px",

                color: "text.secondary",
              }}
            >
              Add some tasks to see analytics.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",

              flexDirection: "column",

              gap: 2,
            }}
          >
            {entries.map(
              ([name, count]) => {
                const percentage =
                  total === 0
                    ? 0
                    : Math.round(
                        (count / total) * 100
                      );

                const barColor =
                  getBarColor(
                    name,
                    type
                  );

                return (
                  <Box key={name}>
                    {/* LABEL */}

                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "center",

                        justifyContent:
                          "space-between",

                        gap: 2,

                        mb: 0.7,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "11px",

                          fontWeight: 600,

                          color: "text.primary",

                          overflow: "hidden",

                          textOverflow: "ellipsis",

                          whiteSpace: "nowrap",
                        }}
                      >
                        {name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "10px",

                          fontWeight: 700,

                          color: "text.secondary",

                          whiteSpace: "nowrap",
                        }}
                      >
                        {count} · {percentage}%
                      </Typography>
                    </Box>

                    {/* BAR */}

                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 6,

                        borderRadius: 6,

                        backgroundColor:
                          "action.hover",

                        "& .MuiLinearProgress-bar": {
                          borderRadius: 6,

                          backgroundColor:
                            barColor,
                        },
                      }}
                    />
                  </Box>
                );
              }
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// ==========================================
// BAR COLOR
// ==========================================

const getBarColor = (
  name,
  type
) => {
  if (type === "priority") {
    switch (
      name.toLowerCase()
    ) {
      case "high":
        return "error.main";

      case "medium":
        return "warning.main";

      case "low":
        return "success.main";

      default:
        return "primary.main";
    }
  }

  if (type === "status") {
    switch (
      name.toLowerCase()
    ) {
      case "completed":
        return "success.main";

      case "pending":
        return "warning.main";

      default:
        return "primary.main";
    }
  }

  return "primary.main";
};

export default Analytics;