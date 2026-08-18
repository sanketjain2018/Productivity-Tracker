import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

// ==========================================
// PRIORITY CONFIG
// ==========================================

const getPriorityConfig = (priority) => {
  switch (
    priority?.toString().trim().toLowerCase()
  ) {
    case "high":
      return {
        label: "High",
        color: "error",
        accent: "error.main",
      };

    case "medium":
      return {
        label: "Medium",
        color: "warning",
        accent: "warning.main",
      };

    case "low":
      return {
        label: "Low",
        color: "success",
        accent: "success.main",
      };

    default:
      return {
        label: priority || "Medium",
        color: "default",
        accent: "primary.main",
      };
  }
};

// ==========================================
// TIME DISPLAY
// ==========================================

const getTimeDisplay = (
  startTime,
  endTime
) => {
  if (!startTime) {
    return "Time not set";
  }

  if (!endTime) {
    return startTime;
  }

  return `${startTime} – ${endTime}`;
};

// ==========================================
// PLANNER TASK CARD
// ==========================================

const PlannerTaskCard = ({
  task,
  onEdit,
  onDelete,
}) => {
  const priority =
    getPriorityConfig(
      task.priority
    );

  const isCompleted =
    task.status === "completed";

  const activities =
    Array.isArray(task.activities)
      ? task.activities
      : [];

  return (
    <Card
      sx={{
        position: "relative",

        height: "100%",

        minHeight: 280,

        display: "flex",

        flexDirection: "column",

        overflow: "hidden",

        borderRadius: 2,

        border: "1px solid",

        borderColor:
          isCompleted
            ? "rgba(34, 197, 94, 0.28)"
            : "divider",

        backgroundColor:
          isCompleted
            ? "rgba(34, 197, 94, 0.025)"
            : "background.paper",

        boxShadow:
          "0 1px 2px rgba(15, 23, 42, 0.03)",

        transition:
          "transform .2s ease, border-color .2s ease, box-shadow .2s ease",

        "&:hover": {
          transform:
            "translateY(-3px)",

          borderColor:
            isCompleted
              ? "success.main"
              : "primary.main",

          boxShadow:
            "0 12px 30px rgba(15, 23, 42, 0.09)",
        },
      }}
    >
      {/* ====================================== */}
      {/* PRIORITY ACCENT */}
      {/* ====================================== */}

      <Box
        sx={{
          position: "absolute",

          top: 0,

          left: 0,

          right: 0,

          height: 3,

          backgroundColor:
            isCompleted
              ? "success.main"
              : priority.accent,
        }}
      />

      <CardContent
        sx={{
          p: {
            xs: 2,
            sm: 2.25,
          },

          display: "flex",

          flexDirection: "column",

          flexGrow: 1,

          "&:last-child": {
            pb: {
              xs: 2,
              sm: 2.25,
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
          {/* TASK IDENTITY */}

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
            {/* ICON */}

            <Box
              sx={{
                width: 46,

                height: 46,

                flexShrink: 0,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius: 1.5,

                backgroundColor:
                  isCompleted
                    ? "rgba(34, 197, 94, 0.09)"
                    : "rgba(59, 130, 246, 0.08)",

                color:
                  isCompleted
                    ? "success.main"
                    : "primary.main",

                fontSize:
                  "1.3rem",
              }}
            >
              {task.icon || "📝"}
            </Box>

            {/* TITLE + TIME */}

            <Box
              sx={{
                minWidth: 0,

                pt: 0.15,
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

                  gap: 0.5,

                  mt: 0.7,

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

                    whiteSpace:
                      "nowrap",
                  }}
                >
                  {getTimeDisplay(
                    task.startTime,
                    task.endTime
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* PRIORITY */}

          <Chip
            label={
              priority.label
            }
            color={
              priority.color
            }
            variant="outlined"
            size="small"
            sx={{
              height: 23,

              flexShrink: 0,

              fontSize:
                "9px",

              fontWeight: 700,

              textTransform:
                "uppercase",

              "& .MuiChip-label":
                {
                  px: 0.9,
                },
            }}
          />
        </Box>

        {/* ====================================== */}
        {/* STATUS */}
        {/* ====================================== */}

        <Box
          sx={{
            mt: 1.5,

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap: 1,
          }}
        >
          {/* CATEGORY */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 0.55,

              minWidth: 0,
            }}
          >
            <CategoryOutlinedIcon
              sx={{
                fontSize: 14,

                color:
                  "text.secondary",
              }}
            />

            <Typography
              sx={{
                fontSize:
                  "10px",

                fontWeight: 500,

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
              {task.category ||
                "General"}
            </Typography>
          </Box>

          {/* COMPLETION STATUS */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 0.5,

              flexShrink: 0,
            }}
          >
            {isCompleted ? (
              <CheckCircleOutlineRoundedIcon
                sx={{
                  fontSize: 14,

                  color:
                    "success.main",
                }}
              />
            ) : (
              <RadioButtonUncheckedRoundedIcon
                sx={{
                  fontSize: 14,

                  color:
                    "text.disabled",
                }}
              />
            )}

            <Typography
              sx={{
                fontSize:
                  "9px",

                fontWeight: 600,

                color:
                  isCompleted
                    ? "success.main"
                    : "text.secondary",
              }}
            >
              {isCompleted
                ? "Completed"
                : "Pending"}
            </Typography>
          </Box>
        </Box>

        {/* ====================================== */}
        {/* ACTIVITIES */}
        {/* ====================================== */}

        <Box
          sx={{
            mt: 1.75,

            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              mb: 0.9,
            }}
          >
            <Typography
              sx={{
                fontSize:
                  "9px",

                fontWeight: 700,

                color:
                  "text.secondary",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.07em",
              }}
            >
              Checklist
            </Typography>

            {activities.length >
              0 && (
              <Typography
                sx={{
                  fontSize:
                    "9px",

                  color:
                    "text.secondary",
                }}
              >
                {activities.length}{" "}
                {activities.length ===
                1
                  ? "item"
                  : "items"}
              </Typography>
            )}
          </Box>

          {activities.length >
          0 ? (
            <Box
              sx={{
                display: "flex",

                flexDirection:
                  "column",

                gap: 0.65,
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
                      <Box
                        sx={{
                          width: 18,

                          height: 18,

                          flexShrink: 0,

                          border:
                            "1px solid",

                          borderColor:
                            isCompleted
                              ? "success.main"
                              : "divider",

                          borderRadius:
                            0.6,

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          backgroundColor:
                            isCompleted
                              ? "rgba(34, 197, 94, 0.07)"
                              : "transparent",

                          color:
                            isCompleted
                              ? "success.main"
                              : "transparent",

                          mt: "1px",
                        }}
                      >
                        {isCompleted && (
                          <CheckRoundedIcon
                            sx={{
                              fontSize:
                                12,
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        sx={{
                          fontSize:
                            "10.5px",

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
                        {
                          activity
                        }
                      </Typography>
                    </Box>
                  )
                )}

              {activities.length >
                4 && (
                <Box
                  sx={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: 0.5,

                    mt: 0.25,

                    color:
                      "primary.main",
                  }}
                >
                  <MoreHorizRoundedIcon
                    sx={{
                      fontSize:
                        15,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize:
                        "9px",

                      fontWeight:
                        600,
                    }}
                  >
                    {activities.length -
                      4}{" "}
                    more
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                py: 1.25,

                px: 1.25,

                border:
                  "1px dashed",

                borderColor:
                  "divider",

                borderRadius: 1,

                backgroundColor:
                  "action.hover",
              }}
            >
              <Typography
                sx={{
                  fontSize:
                    "9.5px",

                  color:
                    "text.secondary",

                  fontStyle:
                    "italic",
                }}
              >
                No checklist items
              </Typography>
            </Box>
          )}
        </Box>

        {/* ====================================== */}
        {/* ACTION BAR */}
        {/* ====================================== */}

        <Box
          sx={{
            mt: 2,

            pt: 1.5,

            borderTop:
              "1px solid",

            borderColor:
              "divider",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "flex-end",

            gap: 0.75,
          }}
        >
          <Tooltip title="Edit task">
            <IconButton
              onClick={() =>
                onEdit(task)
              }
              aria-label="Edit task"
              size="small"
              sx={{
                width: 34,

                height: 34,

                border:
                  "1px solid",

                borderColor:
                  "divider",

                borderRadius: 1,

                color:
                  "text.secondary",

                transition:
                  "all .18s ease",

                "&:hover": {
                  color:
                    "primary.main",

                  borderColor:
                    "primary.main",

                  backgroundColor:
                    "rgba(59, 130, 246, 0.05)",
                },
              }}
            >
              <EditOutlinedIcon
                sx={{
                  fontSize: 17,
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete task">
            <IconButton
              onClick={() =>
                onDelete(task)
              }
              aria-label="Delete task"
              size="small"
              sx={{
                width: 34,

                height: 34,

                border:
                  "1px solid",

                borderColor:
                  "divider",

                borderRadius: 1,

                color:
                  "text.secondary",

                transition:
                  "all .18s ease",

                "&:hover": {
                  color:
                    "error.main",

                  borderColor:
                    "error.main",

                  backgroundColor:
                    "rgba(239, 68, 68, 0.06)",
                },
              }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{
                  fontSize: 17,
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlannerTaskCard;