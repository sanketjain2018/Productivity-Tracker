import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import TaskCard from "../../components/dashboard/TaskCard";
import CurrentTaskPanel from "../../components/dashboard/CurrentTaskPanel";
import DashboardSummaryCards from "../../components/dashboard/DashboardSummaryCards";

import useCurrentTime from "../../hooks/useCurrentTime";
import useTasks from "../../hooks/useTasks";

import {
  getGreeting,
  getFormattedDate,
} from "../../utils/dateTimeUtils";

import {
  getCurrentAndNextTask,
} from "../../utils/taskTimeUtils";

import {
  calculateCurrentStreak,
} from "../../utils/streakUtils";

// ==========================================
// DASHBOARD
// ==========================================

const Dashboard = () => {
  // ==========================================
  // TASK DATA
  // ==========================================

  const {
    tasks,
    totalTasks,
    completedTasks,
    pendingTasks,
    progress,
    toggleTaskComplete,
  } = useTasks();

  // ==========================================
  // CURRENT TIME
  // ==========================================

  const currentTime =
    useCurrentTime();

  // ==========================================
  // GREETING & DATE
  // ==========================================

  const greeting =
    getGreeting(currentTime);

  const formattedDate =
    getFormattedDate(currentTime);

  // ==========================================
  // CURRENT STREAK
  // ==========================================

  const streak =
    calculateCurrentStreak(
      currentTime
    );

  // ==========================================
  // CURRENT TIME IN MINUTES
  // ==========================================

  const currentMinutes =
    currentTime.getHours() * 60 +
    currentTime.getMinutes();

  // ==========================================
  // CURRENT / NEXT TASK
  // ==========================================

  const {
    currentTask,
    nextTask,
  } = getCurrentAndNextTask(
    tasks,
    currentMinutes
  );

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
          mb: 3,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "30px",
            },

            fontWeight: 700,

            lineHeight: 1.2,

            letterSpacing:
              "-0.02em",

            color:
              "text.primary",
          }}
        >
          {greeting.message}
        </Typography>

        <Typography
          sx={{
            mt: 0.7,

            fontSize: "12px",

            color:
              "text.secondary",

            fontWeight: 500,
          }}
        >
          {formattedDate}
        </Typography>

        <Typography
          sx={{
            mt: 0.8,

            fontSize: "13px",

            color:
              "text.secondary",

            maxWidth: 600,

            lineHeight: 1.5,
          }}
        >
          Stay focused, work through your
          priorities, and make today count.
        </Typography>
      </Box>

      {/* ====================================== */}
      {/* SUMMARY CARDS */}
      {/* ====================================== */}

      <DashboardSummaryCards
        progress={progress}
        completedTasks={
          completedTasks
        }
        pendingTasks={
          pendingTasks
        }
        streak={streak}
      />

      {/* ====================================== */}
      {/* DAILY OVERVIEW */}
      {/* ====================================== */}

      <Card
        sx={{
          mb: 3,

          border: "1px solid",

          borderColor:
            progress === 100
              ? "success.main"
              : "divider",

          borderRadius: 1.5,

          backgroundColor:
            "background.paper",

          boxShadow: "none",

          overflow: "hidden",

          transition:
            "border-color 0.2s ease",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2,
              sm: 2.5,
            },

            "&:last-child": {
              pb: {
                xs: 2,
                sm: 2.5,
              },
            },
          }}
        >
          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <Box
            sx={{
              display: "flex",

              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              justifyContent:
                "space-between",

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              gap: 2,

              mb: 2,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",

                  alignItems:
                    "center",

                  gap: 0.8,
                }}
              >
                <AssignmentOutlinedIcon
                  sx={{
                    fontSize: 18,

                    color:
                      "primary.main",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "13px",

                    fontWeight: 700,

                    color:
                      "text.primary",
                  }}
                >
                  Daily Overview
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: 0.5,

                  fontSize: "11px",

                  color:
                    "text.secondary",
                }}
              >
                Your progress for today
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: "22px",

                fontWeight: 700,

                lineHeight: 1,

                color:
                  progress === 100
                    ? "success.main"
                    : "primary.main",
              }}
            >
              {progress}%
            </Typography>
          </Box>

          {/* ================================= */}
          {/* PROGRESS BAR */}
          {/* ================================= */}

          <LinearProgress
            variant="determinate"
            value={progress}
            color={
              progress === 100
                ? "success"
                : "primary"
            }
            sx={{
              height: 6,

              borderRadius: 6,

              backgroundColor:
                "action.hover",

              "& .MuiLinearProgress-bar":
                {
                  borderRadius: 6,
                },
            }}
          />

          {/* ================================= */}
          {/* STATISTICS */}
          {/* ================================= */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",

                sm:
                  "repeat(3, minmax(0, 1fr))",
              },

              gap: {
                xs: 1,
                sm: 2,
              },

              mt: 2,
            }}
          >
            {/* COMPLETED */}

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "center",

                gap: 1,

                p: 1.25,

                borderRadius: 1,

                backgroundColor:
                  "rgba(34, 197, 94, 0.06)",
              }}
            >
              <CheckCircleOutlineOutlinedIcon
                sx={{
                  fontSize: 18,

                  color:
                    "success.main",
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize:
                      "10px",

                    color:
                      "text.secondary",
                  }}
                >
                  Completed
                </Typography>

                <Typography
                  sx={{
                    fontSize:
                      "13px",

                    fontWeight: 700,

                    color:
                      "success.main",
                  }}
                >
                  {completedTasks}
                </Typography>
              </Box>
            </Box>

            {/* PENDING */}

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "center",

                gap: 1,

                p: 1.25,

                borderRadius: 1,

                backgroundColor:
                  "rgba(245, 158, 11, 0.06)",
              }}
            >
              <ScheduleOutlinedIcon
                sx={{
                  fontSize: 18,

                  color:
                    "warning.main",
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize:
                      "10px",

                    color:
                      "text.secondary",
                  }}
                >
                  Pending
                </Typography>

                <Typography
                  sx={{
                    fontSize:
                      "13px",

                    fontWeight: 700,

                    color:
                      "warning.main",
                  }}
                >
                  {pendingTasks}
                </Typography>
              </Box>
            </Box>

            {/* TOTAL */}

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "center",

                gap: 1,

                p: 1.25,

                borderRadius: 1,

                backgroundColor:
                  "action.hover",
              }}
            >
              <AssignmentOutlinedIcon
                sx={{
                  fontSize: 18,

                  color:
                    "text.secondary",
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize:
                      "10px",

                    color:
                      "text.secondary",
                  }}
                >
                  Total Tasks
                </Typography>

                <Typography
                  sx={{
                    fontSize:
                      "13px",

                    fontWeight: 700,
                  }}
                >
                  {totalTasks}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ================================= */}
          {/* COMPLETE MESSAGE */}
          {/* ================================= */}

          {progress === 100 &&
            totalTasks > 0 && (
              <Box
                sx={{
                  mt: 2,

                  display: "flex",

                  alignItems:
                    "center",

                  gap: 1,

                  p: 1.25,

                  borderRadius: 1,

                  backgroundColor:
                    "rgba(34, 197, 94, 0.08)",
                }}
              >
                <CheckCircleOutlineOutlinedIcon
                  sx={{
                    fontSize: 17,

                    color:
                      "success.main",
                  }}
                />

                <Typography
                  sx={{
                    fontSize:
                      "11px",

                    fontWeight: 600,

                    color:
                      "success.main",
                  }}
                >
                  Great work — you've
                  completed everything
                  scheduled for today.
                </Typography>
              </Box>
            )}
        </CardContent>
      </Card>

      {/* ====================================== */}
      {/* CURRENT & NEXT TASK */}
      {/* ====================================== */}

      <CurrentTaskPanel
        currentTask={
          currentTask
        }
        nextTask={nextTask}
      />

      {/* ====================================== */}
      {/* TODAY'S SCHEDULE HEADER */}
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

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 1,

          mb: 1.75,
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
            Today's Schedule
          </Typography>

          <Typography
            sx={{
              mt: 0.35,

              fontSize: "11px",

              color:
                "text.secondary",
            }}
          >
            Your planned tasks for today
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            gap: 0.75,

            color:
              pendingTasks > 0
                ? "warning.main"
                : "success.main",
          }}
        >
          {pendingTasks > 0 ? (
            <ScheduleOutlinedIcon
              sx={{
                fontSize: 15,
              }}
            />
          ) : (
            <CheckCircleOutlineOutlinedIcon
              sx={{
                fontSize: 15,
              }}
            />
          )}

          <Typography
            sx={{
              fontSize: "11px",

              fontWeight: 600,
            }}
          >
            {pendingTasks}{" "}
            {pendingTasks === 1
              ? "task"
              : "tasks"}{" "}
            remaining
          </Typography>
        </Box>
      </Box>

      {/* ====================================== */}
      {/* EMPTY STATE */}
      {/* ====================================== */}

      {tasks.length === 0 ? (
        <Card
          sx={{
            border: "1px dashed",

            borderColor:
              "divider",

            borderRadius: 1.5,

            boxShadow: "none",

            backgroundColor:
              "background.paper",
          }}
        >
          <CardContent
            sx={{
              py: 6,

              textAlign: "center",
            }}
          >
            <AssignmentOutlinedIcon
              sx={{
                fontSize: 36,

                color:
                  "text.secondary",

                mb: 1,
              }}
            />

            <Typography
              sx={{
                fontSize: "14px",

                fontWeight: 600,
              }}
            >
              No tasks scheduled
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: "11px",

                color:
                  "text.secondary",
              }}
            >
              Add a task to start
              planning your day.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        /* ==================================== */
        /* TASK GRID */
        /* ==================================== */

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
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={
                toggleTaskComplete
              }
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;