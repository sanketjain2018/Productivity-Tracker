import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import CalendarTaskList from "./CalendarTaskList";

// ==========================================
// CALENDAR TASK DIALOG
// ==========================================

const CalendarTaskDialog = ({
  open,
  selectedDate,
  tasks = [],
  onClose,
}) => {
  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,

          border: "1px solid",

          borderColor: "divider",

          backgroundColor:
            "background.paper",

          backgroundImage: "none",
        },
      }}
    >
      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <DialogTitle
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
          },

          py: 2,

          borderBottom:
            "1px solid",

          borderColor:
            "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap: 2,
          }}
        >
          {/* TITLE */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 1.25,

              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 38,

                height: 38,

                flexShrink: 0,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius: 1,

                backgroundColor:
                  "rgba(59, 130, 246, 0.08)",

                color:
                  "primary.main",
              }}
            >
              <CalendarMonthOutlinedIcon
                sx={{
                  fontSize: 20,
                }}
              />
            </Box>

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize:
                    "15px",

                  fontWeight: 700,

                  lineHeight:
                    1.3,

                  color:
                    "text.primary",
                }}
              >
                Scheduled Tasks
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,

                  fontSize:
                    "10px",

                  color:
                    "text.secondary",

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",

                  whiteSpace:
                    "nowrap",
                }}
              >
                {selectedDate ||
                  "Selected date"}
              </Typography>
            </Box>
          </Box>

          {/* CLOSE */}

          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close dialog"
            sx={{
              width: 32,

              height: 32,

              borderRadius: 1,

              color:
                "text.secondary",

              "&:hover": {
                backgroundColor:
                  "action.hover",

                color:
                  "text.primary",
              },
            }}
          >
            <CloseOutlinedIcon
              sx={{
                fontSize: 18,
              }}
            />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <DialogContent
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
          },

          py: 2.25,
        }}
      >
        {tasks.length ===
        0 ? (
          /* ================================== */
          /* EMPTY STATE */
          /* ================================== */

          <Box
            sx={{
              py: 4,

              textAlign:
                "center",
            }}
          >
            <Box
              sx={{
                width: 52,

                height: 52,

                mx: "auto",

                mb: 1.5,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius:
                  "50%",

                backgroundColor:
                  "action.hover",

                color:
                  "text.secondary",
              }}
            >
              <TaskAltOutlinedIcon
                sx={{
                  fontSize: 25,
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize:
                  "14px",

                fontWeight: 700,

                color:
                  "text.primary",
              }}
            >
              No tasks scheduled
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize:
                  "11px",

                color:
                  "text.secondary",
              }}
            >
              There are no tasks
              planned for this
              day.
            </Typography>
          </Box>
        ) : (
          /* ================================== */
          /* TASK CONTENT */
          /* ================================== */

          <>
            {/* SUMMARY */}

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "space-between",

                gap: 1.5,

                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize:
                    "11px",

                  fontWeight: 600,

                  color:
                    "text.secondary",
                }}
              >
                {tasks.length ===
                1
                  ? "1 task scheduled"
                  : `${tasks.length} tasks scheduled`}
              </Typography>

              <Box
                sx={{
                  display: "flex",

                  alignItems:
                    "center",

                  gap: 0.75,
                }}
              >
                {completedTasks >
                  0 && (
                  <Chip
                    label={`${completedTasks} done`}
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{
                      height: 22,

                      fontSize:
                        "9px",

                      fontWeight:
                        600,
                    }}
                  />
                )}

                {pendingTasks >
                  0 && (
                  <Chip
                    label={`${pendingTasks} pending`}
                    size="small"
                    color="warning"
                    variant="outlined"
                    sx={{
                      height: 22,

                      fontSize:
                        "9px",

                      fontWeight:
                        600,
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* TASK LIST */}

            <CalendarTaskList
              tasks={tasks}
            />
          </>
        )}
      </DialogContent>

      {/* ====================================== */}
      {/* ACTIONS */}
      {/* ====================================== */}

      <DialogActions
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
          },

          py: 1.5,

          borderTop:
            "1px solid",

          borderColor:
            "divider",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            minHeight: 34,

            px: 2,

            borderRadius: 1,

            fontSize:
              "11px",

            fontWeight: 600,

            textTransform:
              "none",

            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarTaskDialog;