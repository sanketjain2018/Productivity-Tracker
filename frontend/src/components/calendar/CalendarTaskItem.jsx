import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
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
        accent: "error.main",
      };

    case "medium":
      return {
        color: "warning",
        accent: "warning.main",
      };

    case "low":
      return {
        color: "success",
        accent: "success.main",
      };

    case "normal":
      return {
        color: "warning",
        accent: "warning.main",
      };

    default:
      return {
        color: "default",
        accent: "primary.main",
      };
  }
};

// ==========================================
// CALENDAR TASK ITEM
// ==========================================

const CalendarTaskItem = ({
  task,
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
      variant="outlined"
      sx={{
        position: "relative",

        overflow: "hidden",

        borderRadius: 1.5,

        borderColor:
          isCompleted
            ? "rgba(34, 197, 94, 0.35)"
            : "divider",

        backgroundColor:
          isCompleted
            ? "rgba(34, 197, 94, 0.025)"
            : "background.paper",

        boxShadow: "none",

        transition:
          "border-color 0.18s ease, box-shadow 0.18s ease",

        "&:hover": {
          borderColor:
            isCompleted
              ? "success.main"
              : "primary.main",

          boxShadow:
            "0 6px 18px rgba(15, 23, 42, 0.07)",
        },
      }}
    >
      {/* ====================================== */}
      {/* LEFT ACCENT */}
      {/* ====================================== */}

      <Box
        sx={{
          position: "absolute",

          top: 0,

          bottom: 0,

          left: 0,

          width: 3,

          backgroundColor:
            isCompleted
              ? "success.main"
              : priority.accent,
        }}
      />

      <CardContent
        sx={{
          p: {
            xs: 1.5,
            sm: 1.75,
          },

          "&:last-child": {
            pb: {
              xs: 1.5,
              sm: 1.75,
            },
          },
        }}
      >
        {/* ====================================== */}
        {/* HEADER */}
        {/* ====================================== */}

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
          {/* TASK INFORMATION */}

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
                  isCompleted
                    ? "rgba(34, 197, 94, 0.08)"
                    : "action.hover",

                color:
                  isCompleted
                    ? "success.main"
                    : "primary.main",

                fontSize:
                  "1rem",
              }}
            >
              {task.icon ||
                "📝"}
            </Box>

            {/* TITLE + TIME */}

            <Box
              sx={{
                minWidth: 0,

                flexGrow: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize:
                    "13px",

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

                  gap: 0.5,

                  mt: 0.6,

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
            label={
              task.priority ||
              "Medium"
            }
            color={
              priority.color
            }
            size="small"
            variant="outlined"
            sx={{
              height: 22,

              flexShrink: 0,

              fontSize:
                "9px",

              fontWeight: 700,

              textTransform:
                "uppercase",
            }}
          />
        </Box>

        {/* ====================================== */}
        {/* META */}
        {/* ====================================== */}

        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            flexWrap: "wrap",

            gap: 0.75,

            mt: 1.5,
          }}
        >
          {/* CATEGORY */}

          {task.category && (
            <Chip
              icon={
                <CategoryOutlinedIcon
                  sx={{
                    fontSize:
                      "13px !important",
                  }}
                />
              }
              label={
                task.category
              }
              size="small"
              variant="outlined"
              sx={{
                height: 23,

                borderColor:
                  "divider",

                color:
                  "text.secondary",

                fontSize:
                  "9px",

                fontWeight: 500,

                "& .MuiChip-label":
                  {
                    px: 0.75,
                  },
              }}
            />
          )}

          {/* STATUS */}

          <Chip
            icon={
              isCompleted ? (
                <CheckCircleOutlineOutlinedIcon
                  sx={{
                    fontSize:
                      "13px !important",
                  }}
                />
              ) : (
                <RadioButtonUncheckedOutlinedIcon
                  sx={{
                    fontSize:
                      "13px !important",
                  }}
                />
              )
            }
            label={
              isCompleted
                ? "Completed"
                : "Pending"
            }
            size="small"
            color={
              isCompleted
                ? "success"
                : "default"
            }
            variant={
              isCompleted
                ? "outlined"
                : "outlined"
            }
            sx={{
              height: 23,

              fontSize:
                "9px",

              fontWeight: 600,

              "& .MuiChip-label":
                {
                  px: 0.75,
                },
            }}
          />
        </Box>

        {/* ====================================== */}
        {/* ACTIVITIES */}
        {/* ====================================== */}

        {activities.length >
          0 && (
          <Box
            sx={{
              mt: 1.5,

              pt: 1.5,

              borderTop:
                "1px solid",

              borderColor:
                "divider",
            }}
          >
            <Typography
              sx={{
                mb: 0.75,

                fontSize:
                  "9px",

                fontWeight: 700,

                color:
                  "text.secondary",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.05em",
              }}
            >
              Activities
            </Typography>

            <Box
              sx={{
                display: "flex",

                flexDirection:
                  "column",

                gap: 0.6,
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
                      key={`${task.id}-activity-${index}`}
                      sx={{
                        display:
                          "flex",

                        alignItems:
                          "flex-start",

                        gap: 0.75,
                      }}
                    >
                      <Box
                        sx={{
                          width: 5,

                          height: 5,

                          mt: "5px",

                          borderRadius:
                            "50%",

                          backgroundColor:
                            isCompleted
                              ? "success.main"
                              : "primary.main",

                          flexShrink: 0,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize:
                            "10px",

                          lineHeight:
                            1.45,

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
                      "9px",

                    fontWeight: 600,

                    color:
                      "primary.main",
                  }}
                >
                  +
                  {activities.length -
                    4}{" "}
                  more activities
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarTaskItem;