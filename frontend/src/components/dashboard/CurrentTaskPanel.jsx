import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

// ==========================================
// PRIORITY CONFIG
// ==========================================

const getPriorityConfig = (priority) => {
  switch (
    priority?.toString().trim().toLowerCase()
  ) {
    case "high":
      return {
        color: "error",
        label: "HIGH",
      };

    case "medium":
      return {
        color: "warning",
        label: "MEDIUM",
      };

    case "low":
      return {
        color: "success",
        label: "LOW",
      };

    default:
      return {
        color: "default",
        label: priority || "MEDIUM",
      };
  }
};

// ==========================================
// TASK INFO CARD
// ==========================================

const TaskInfoCard = ({
  label,
  task,
  emptyMessage,
  active = false,
}) => {
  const priority =
    getPriorityConfig(
      task?.priority
    );

  return (
    <Card
      sx={{
        height: "100%",

        position: "relative",

        overflow: "hidden",

        border: "1px solid",

        borderColor: active
          ? "primary.main"
          : "divider",

        borderRadius: 1.5,

        backgroundColor:
          "background.paper",

        boxShadow: "none",

        transition:
          "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform:
            "translateY(-2px)",

          borderColor: active
            ? "primary.main"
            : "text.secondary",

          boxShadow:
            "0 8px 24px rgba(15, 23, 42, 0.07)",
        },
      }}
    >
      {/* ====================================== */}
      {/* ACTIVE ACCENT */}
      {/* ====================================== */}

      {active && (
        <Box
          sx={{
            position: "absolute",

            top: 0,

            left: 0,

            width: "100%",

            height: 2,

            backgroundColor:
              "primary.main",
          }}
        />
      )}

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
              "center",

            justifyContent:
              "space-between",

            gap: 1.5,

            mb: 1.75,
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 0.75,

              minWidth: 0,
            }}
          >
            {active ? (
              <PlayCircleOutlineOutlinedIcon
                sx={{
                  fontSize: 17,

                  color:
                    "primary.main",
                }}
              />
            ) : (
              <ArrowForwardOutlinedIcon
                sx={{
                  fontSize: 17,

                  color:
                    "text.secondary",
                }}
              />
            )}

            <Typography
              sx={{
                fontSize: "10px",

                fontWeight: 700,

                letterSpacing:
                  "0.07em",

                color: active
                  ? "primary.main"
                  : "text.secondary",

                textTransform:
                  "uppercase",
              }}
            >
              {label}
            </Typography>
          </Box>

          {/* ACTIVE STATUS */}

          {active && task && (
            <Chip
              label="ACTIVE"
              size="small"
              color="primary"
              sx={{
                height: 21,

                flexShrink: 0,

                fontSize: "8px",

                fontWeight: 700,

                letterSpacing:
                  "0.04em",
              }}
            />
          )}
        </Box>

        {/* ==================================== */}
        {/* TASK */}
        {/* ==================================== */}

        {task ? (
          <Box>
            {/* TASK HEADER */}

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "flex-start",

                gap: 1.25,
              }}
            >
              {/* TASK ICON */}

              <Box
                sx={{
                  width: 42,

                  height: 42,

                  flexShrink: 0,

                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  borderRadius: 1,

                  backgroundColor:
                    active
                      ? "rgba(59, 130, 246, 0.10)"
                      : "action.hover",

                  color: active
                    ? "primary.main"
                    : "text.secondary",

                  fontSize:
                    "1.25rem",
                }}
              >
                {task.icon || "📝"}
              </Box>

              {/* TASK INFORMATION */}

              <Box
                sx={{
                  minWidth: 0,

                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "15px",
                    },

                    fontWeight: 700,

                    lineHeight: 1.35,

                    color:
                      "text.primary",

                    display:
                      "-webkit-box",

                    WebkitLineClamp: 2,

                    WebkitBoxOrient:
                      "vertical",

                    overflow:
                      "hidden",
                  }}
                >
                  {task.title}
                </Typography>

                {/* TIME */}

                <Box
                  sx={{
                    display: "flex",

                    alignItems:
                      "center",

                    gap: 0.55,

                    mt: 0.65,

                    color:
                      "text.secondary",
                  }}
                >
                  <AccessTimeOutlinedIcon
                    sx={{
                      fontSize: 14,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize:
                        "10px",

                      fontWeight: 500,
                    }}
                  >
                    {task.startTime}{" "}
                    –{" "}
                    {task.endTime}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ================================= */}
            {/* META */}
            {/* ================================= */}

            <Box
              sx={{
                display: "flex",

                flexWrap: "wrap",

                alignItems:
                  "center",

                gap: 0.7,

                mt: 1.75,
              }}
            >
              {/* CATEGORY */}

              {task.category && (
                <Chip
                  label={
                    task.category
                  }
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 22,

                    fontSize:
                      "9px",

                    fontWeight: 500,
                  }}
                />
              )}

              {/* PRIORITY */}

              {task.priority && (
                <Chip
                  label={
                    priority.label
                  }
                  size="small"
                  color={
                    priority.color
                  }
                  variant="outlined"
                  sx={{
                    height: 22,

                    fontSize:
                      "9px",

                    fontWeight: 700,

                    letterSpacing:
                      "0.02em",
                  }}
                />
              )}

              {/* COMPLETED */}

              {task.status ===
                "completed" && (
                <Chip
                  icon={
                    <CheckCircleOutlineOutlinedIcon />
                  }
                  label="Completed"
                  size="small"
                  color="success"
                  sx={{
                    height: 22,

                    fontSize:
                      "9px",

                    fontWeight: 600,

                    "& .MuiChip-icon":
                      {
                        fontSize:
                          13,
                      },
                  }}
                />
              )}
            </Box>

            {/* ================================= */}
            {/* ACTIVE MESSAGE */}
            {/* ================================= */}

            {active &&
              task.status !==
                "completed" && (
                <Box
                  sx={{
                    mt: 1.75,

                    px: 1.25,

                    py: 0.9,

                    borderRadius: 1,

                    backgroundColor:
                      "rgba(59, 130, 246, 0.06)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize:
                        "10px",

                      fontWeight: 600,

                      color:
                        "primary.main",
                    }}
                  >
                    Focus on this
                    task now
                  </Typography>
                </Box>
              )}
          </Box>
        ) : (
          /* ================================= */
          /* EMPTY STATE */
          /* ================================= */

          <Box
            sx={{
              minHeight: 96,

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              textAlign: "center",

              px: 2,

              borderRadius: 1,

              backgroundColor:
                "action.hover",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize:
                    "13px",

                  fontWeight: 600,

                  color:
                    "text.primary",
                }}
              >
                {active
                  ? "No active task"
                  : "No upcoming task"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,

                  fontSize:
                    "10px",

                  lineHeight: 1.4,

                  color:
                    "text.secondary",
                }}
              >
                {emptyMessage}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// ==========================================
// CURRENT TASK PANEL
// ==========================================

const CurrentTaskPanel = ({
  currentTask,
  nextTask,
}) => {
  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",

          lg:
            "minmax(0, 1.15fr) minmax(0, 0.85fr)",
        },

        gap: {
          xs: 1.5,
          sm: 2,
        },

        mb: 3,
      }}
    >
      {/* CURRENT TASK */}

      <TaskInfoCard
        label="Current Task"
        task={currentTask}
        active
        emptyMessage="Nothing is scheduled for this time."
      />

      {/* NEXT TASK */}

      <TaskInfoCard
        label="Next Task"
        task={nextTask}
        emptyMessage="No more tasks are scheduled for today."
      />
    </Box>
  );
};

export default CurrentTaskPanel;