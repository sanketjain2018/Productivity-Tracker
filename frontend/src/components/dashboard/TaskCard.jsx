import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

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

    case "normal":
      return {
        color: "warning",
        label: "MEDIUM",
      };

    default:
      return {
        color: "default",
        label: "MEDIUM",
      };
  }
};

// ==========================================
// TASK CARD
// ==========================================

const TaskCard = ({
  task,
  onToggleComplete,
}) => {
  const isCompleted =
    task.status === "completed";

  const priority =
    getPriorityConfig(
      task.priority
    );

  const activities =
    Array.isArray(task.activities)
      ? task.activities
      : [];

  return (
    <Card
      sx={{
        height: "100%",

        display: "flex",

        flexDirection: "column",

        position: "relative",

        overflow: "hidden",

        border: "1px solid",

        borderColor: isCompleted
          ? "success.main"
          : "divider",

        borderRadius: 1.5,

        backgroundColor:
          "background.paper",

        boxShadow: "none",

        opacity: isCompleted
          ? 0.9
          : 1,

        transition:
          "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform:
            "translateY(-2px)",

          borderColor: isCompleted
            ? "success.main"
            : "primary.main",

          boxShadow:
            "0 10px 28px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      {/* ====================================== */}
      {/* STATUS ACCENT */}
      {/* ====================================== */}

      <Box
        sx={{
          position: "absolute",

          top: 0,

          left: 0,

          width: 3,

          height: "100%",

          backgroundColor:
            isCompleted
              ? "success.main"
              : "primary.main",

          opacity:
            isCompleted ? 0.8 : 1,
        }}
      />

      <CardContent
        sx={{
          p: {
            xs: 1.75,
            sm: 2,
          },

          display: "flex",

          flexDirection: "column",

          flexGrow: 1,

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

            gap: 1.25,
          }}
        >
          {/* ICON + INFORMATION */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "flex-start",

              gap: 1.25,

              minWidth: 0,

              flexGrow: 1,
            }}
          >
            {/* TASK ICON */}

            <Box
              sx={{
                width: 40,

                height: 40,

                flexShrink: 0,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius: 1,

                backgroundColor:
                  isCompleted
                    ? "rgba(34, 197, 94, 0.10)"
                    : "rgba(59, 130, 246, 0.08)",

                color: isCompleted
                  ? "success.main"
                  : "primary.main",

                fontSize:
                  "1.15rem",
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
                  fontSize:
                    "14px",

                  fontWeight: 700,

                  lineHeight: 1.35,

                  color:
                    "text.primary",

                  textDecoration:
                    isCompleted
                      ? "line-through"
                      : "none",

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

          {/* PRIORITY */}

          <Chip
            label={priority.label}
            color={priority.color}
            size="small"
            variant={
              isCompleted
                ? "outlined"
                : "filled"
            }
            sx={{
              flexShrink: 0,

              height: 22,

              fontSize:
                "9px",

              fontWeight: 700,

              letterSpacing:
                "0.03em",
            }}
          />
        </Box>

        {/* ==================================== */}
        {/* COMPLETED STATUS */}
        {/* ==================================== */}

        {isCompleted && (
          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 0.6,

              mt: 1.25,

              color:
                "success.main",
            }}
          >
            <CheckCircleOutlineOutlinedIcon
              sx={{
                fontSize: 15,
              }}
            />

            <Typography
              sx={{
                fontSize:
                  "10px",

                fontWeight: 700,

                letterSpacing:
                  "0.04em",

                textTransform:
                  "uppercase",
              }}
            >
              Completed
            </Typography>
          </Box>
        )}

        <Divider
          sx={{
            my: 1.5,
          }}
        />

        {/* ==================================== */}
        {/* ACTIVITIES */}
        {/* ==================================== */}

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {/* ACTIVITIES HEADER */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 0.7,

              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize:
                  "10px",

                fontWeight: 700,

                color:
                  "text.secondary",

                letterSpacing:
                  "0.06em",

                textTransform:
                  "uppercase",
              }}
            >
              Activities
            </Typography>

            {activities.length >
              0 && (
              <Box
                sx={{
                  minWidth: 18,

                  height: 18,

                  px: 0.5,

                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  borderRadius: 0.75,

                  backgroundColor:
                    "action.hover",

                  color:
                    "text.secondary",

                  fontSize:
                    "9px",

                  fontWeight: 700,
                }}
              >
                {activities.length}
              </Box>
            )}
          </Box>

          {/* ACTIVITY LIST */}

          {activities.length >
          0 ? (
            <Box
              sx={{
                display: "flex",

                flexDirection:
                  "column",

                gap: 0.75,
              }}
            >
              {activities
                .slice(0, 4)
                .map(
                  (
                    activity,
                    index
                  ) => (
                    <Box
                      key={`${task.id}-${index}`}
                      sx={{
                        display:
                          "flex",

                        alignItems:
                          "flex-start",

                        gap: 0.8,
                      }}
                    >
                      {isCompleted ? (
                        <CheckOutlinedIcon
                          sx={{
                            fontSize:
                              14,

                            mt:
                              "2px",

                            color:
                              "success.main",

                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <RadioButtonUncheckedOutlinedIcon
                          sx={{
                            fontSize:
                              13,

                            mt:
                              "2px",

                            color:
                              "primary.main",

                            flexShrink: 0,
                          }}
                        />
                      )}

                      <Typography
                        sx={{
                          fontSize:
                            "11px",

                          lineHeight:
                            1.5,

                          color:
                            "text.secondary",

                          textDecoration:
                            isCompleted
                              ? "line-through"
                              : "none",

                          opacity:
                            isCompleted
                              ? 0.65
                              : 1,

                          display:
                            "-webkit-box",

                          WebkitLineClamp:
                            2,

                          WebkitBoxOrient:
                            "vertical",

                          overflow:
                            "hidden",
                        }}
                      >
                        {activity}
                      </Typography>
                    </Box>
                  )
                )}

              {activities.length >
                4 && (
                <Typography
                  sx={{
                    mt: 0.25,

                    fontSize:
                      "10px",

                    color:
                      "primary.main",

                    fontWeight: 600,
                  }}
                >
                  +
                  {activities.length -
                    4}{" "}
                  more activities
                </Typography>
              )}
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize:
                  "11px",

                color:
                  "text.secondary",

                fontStyle:
                  "italic",
              }}
            >
              No activities added
            </Typography>
          )}
        </Box>

        {/* ==================================== */}
        {/* FOOTER */}
        {/* ==================================== */}

        <Box
          sx={{
            mt: 1.75,
          }}
        >
          <Divider
            sx={{
              mb: 1.5,
            }}
          />

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              gap: 1.5,
            }}
          >
            {/* CATEGORY */}

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "center",

                gap: 0.6,

                minWidth: 0,
              }}
            >
              <CategoryOutlinedIcon
                sx={{
                  fontSize: 14,

                  color:
                    "text.secondary",

                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  fontSize:
                    "10px",

                  color:
                    "text.secondary",

                  fontWeight: 500,

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",

                  whiteSpace:
                    "nowrap",
                }}
              >
                {task.category ||
                  "General"}
              </Typography>
            </Box>

            {/* COMPLETE ACTION */}

            <Tooltip
              title={
                isCompleted
                  ? "Undo completion"
                  : "Mark task as done"
              }
            >
              <IconButton
                onClick={() =>
                  onToggleComplete(
                    task.id
                  )
                }
                aria-label={
                  isCompleted
                    ? "Undo task completion"
                    : "Mark task as done"
                }
                size="small"
                sx={{
                  width: 34,

                  height: 34,

                  flexShrink: 0,

                  border:
                    "1px solid",

                  borderColor:
                    isCompleted
                      ? "success.main"
                      : "divider",

                  borderRadius: 1,

                  color: isCompleted
                    ? "success.main"
                    : "text.secondary",

                  backgroundColor:
                    isCompleted
                      ? "rgba(34, 197, 94, 0.06)"
                      : "transparent",

                  "&:hover": {
                    backgroundColor:
                      isCompleted
                        ? "rgba(34, 197, 94, 0.12)"
                        : "action.hover",

                    borderColor:
                      isCompleted
                        ? "success.main"
                        : "primary.main",

                    color:
                      isCompleted
                        ? "success.main"
                        : "primary.main",
                  },
                }}
              >
                {isCompleted ? (
                  <UndoOutlinedIcon
                    sx={{
                      fontSize: 17,
                    }}
                  />
                ) : (
                  <CheckOutlinedIcon
                    sx={{
                      fontSize: 17,
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;