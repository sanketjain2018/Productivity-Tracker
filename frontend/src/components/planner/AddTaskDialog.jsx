import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

import { formatTimeTo12Hour } from "../../utils/taskTimeUtils";

// ============================================================
// CATEGORIES
// ============================================================

const categories = [
  {
    value: "Learning",
    icon: "📚",
  },
  {
    value: "Coding",
    icon: "💻",
  },
  {
    value: "Work",
    icon: "💼",
  },
  {
    value: "Health",
    icon: "🏃",
  },
  {
    value: "Reading",
    icon: "📖",
  },
  {
    value: "Personal",
    icon: "👤",
  },
  {
    value: "Career",
    icon: "🎯",
  },
  {
    value: "Break",
    icon: "☕",
  },
  {
    value: "Project",
    icon: "🛠️",
  },
];

// ============================================================
// PRIORITIES
// ============================================================

const priorities = [
  {
    value: "High",
    label: "High",
    description: "Needs attention",
  },
  {
    value: "Medium",
    label: "Medium",
    description: "Normal priority",
  },
  {
    value: "Low",
    label: "Low",
    description: "Can wait",
  },
];

// ============================================================
// TODAY
// ============================================================

const getTodayDate = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// ============================================================
// CATEGORY ICON
// ============================================================

const getCategoryIcon = (
  category
) => {
  return (
    categories.find(
      (item) =>
        item.value === category
    )?.icon ?? "📝"
  );
};

// ============================================================
// 12 HOUR → 24 HOUR
// ============================================================

const convertTimeToInputValue = (
  time
) => {
  if (
    !time ||
    typeof time !== "string"
  ) {
    return "";
  }

  const match = time
    .trim()
    .match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
    );

  if (!match) {
    return time;
  }

  let hours = Number(
    match[1]
  );

  const minutes = Number(
    match[2]
  );

  const modifier =
    match[3].toUpperCase();

  if (hours === 12) {
    hours = 0;
  }

  if (modifier === "PM") {
    hours += 12;
  }

  return `${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

// ============================================================
// SECTION LABEL
// ============================================================

const SectionLabel = ({
  icon,
  children,
  optional = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "7px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",
            backgroundColor:
              "action.hover",
            color:
              "text.secondary",
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 700,
            color: "text.primary",
            letterSpacing:
              "0.02em",
          }}
        >
          {children}
        </Typography>
      </Box>

      {optional && (
        <Typography
          sx={{
            fontSize: "9px",
            color:
              "text.secondary",
          }}
        >
          Optional
        </Typography>
      )}
    </Box>
  );
};

// ============================================================
// QUICK SELECT CARD
// ============================================================

const QuickSelectCard = ({
  selected,
  onClick,
  children,
  icon,
}) => {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        border: "1px solid",
        borderColor: selected
          ? "primary.main"
          : "divider",

        backgroundColor:
          selected
            ? "rgba(59, 130, 246, 0.07)"
            : "background.paper",

        color: "text.primary",

        borderRadius: 1.5,

        minHeight: 58,

        px: 1.5,

        display: "flex",

        alignItems: "center",

        gap: 1,

        cursor: "pointer",

        textAlign: "left",

        transition:
          "border-color .18s ease, background-color .18s ease, transform .18s ease",

        "&:hover": {
          borderColor:
            "primary.main",

          backgroundColor:
            "rgba(59, 130, 246, 0.05)",
        },

        "&:active": {
          transform:
            "scale(.98)",
        },
      }}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          borderRadius: 1,
          backgroundColor:
            selected
              ? "rgba(59, 130, 246, 0.12)"
              : "action.hover",
          color:
            selected
              ? "primary.main"
              : "text.secondary",
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        {children}
      </Box>

      {selected && (
        <CheckRoundedIcon
          sx={{
            ml: "auto",
            fontSize: 17,
            color:
              "primary.main",
          }}
        />
      )}
    </Box>
  );
};

// ============================================================
// ADD TASK DIALOG
// ============================================================

const AddTaskDialog = ({
  open,
  onClose,
  onSaveTask,
  selectedTask,
}) => {
  const titleInputRef =
    useRef(null);

  // ==========================================================
  // STATE
  // ==========================================================

  const [taskTitle, setTaskTitle] =
    useState("");

  const [taskDate, setTaskDate] =
    useState(getTodayDate());

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [category, setCategory] =
    useState("Learning");

  const [priority, setPriority] =
    useState("Medium");

  const [activity, setActivity] =
    useState("");

  const [activities, setActivities] =
    useState([]);

  const [timeError, setTimeError] =
    useState("");

  const isEditing =
    Boolean(selectedTask);

  // ==========================================================
  // RESET
  // ==========================================================

  const resetForm = () => {
    setTaskTitle("");

    setTaskDate(
      getTodayDate()
    );

    setStartTime("");

    setEndTime("");

    setCategory(
      "Learning"
    );

    setPriority(
      "Medium"
    );

    setActivity("");

    setActivities([]);

    setTimeError("");
  };

  // ==========================================================
  // LOAD TASK
  // ==========================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    if (selectedTask) {
      setTaskTitle(
        selectedTask.title ?? ""
      );

      setTaskDate(
        selectedTask.taskDate ??
          getTodayDate()
      );

      setStartTime(
        convertTimeToInputValue(
          selectedTask.startTime
        )
      );

      setEndTime(
        convertTimeToInputValue(
          selectedTask.endTime
        )
      );

      setCategory(
        selectedTask.category ??
          "Learning"
      );

      setPriority(
        selectedTask.priority ??
          "Medium"
      );

      setActivities(
        Array.isArray(
          selectedTask.activities
        )
          ? selectedTask.activities
          : []
      );

      setActivity("");

      setTimeError("");
    } else {
      resetForm();
    }

    const focusTimer =
      window.setTimeout(() => {
        titleInputRef.current?.focus();
      }, 150);

    return () => {
      window.clearTimeout(
        focusTimer
      );
    };
  }, [
    open,
    selectedTask,
  ]);

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    resetForm();

    onClose();
  };

  // ==========================================================
  // ADD ACTIVITY
  // ==========================================================

  const handleAddActivity =
    () => {
      const value =
        activity.trim();

      if (!value) {
        return;
      }

      if (
        activities.includes(
          value
        )
      ) {
        setActivity("");
        return;
      }

      setActivities(
        (previous) => [
          ...previous,
          value,
        ]
      );

      setActivity("");
    };

  // ==========================================================
  // REMOVE ACTIVITY
  // ==========================================================

  const handleRemoveActivity =
    (index) => {
      setActivities(
        (previous) =>
          previous.filter(
            (
              _,
              itemIndex
            ) =>
              itemIndex !==
              index
          )
      );
    };

  // ==========================================================
  // TIME VALIDATION
  // ==========================================================

  const validateTimes = () => {
    setTimeError("");

    if (!startTime) {
      setTimeError(
        "Please add a start time."
      );

      return false;
    }

    // End time is optional.
    if (!endTime) {
      return true;
    }

    if (
      startTime === endTime
    ) {
      setTimeError(
        "Start and end time cannot be the same."
      );

      return false;
    }

    if (
      endTime < startTime
    ) {
      setTimeError(
        "End time must be after start time."
      );

      return false;
    }

    return true;
  };

  // ==========================================================
  // SAVE
  // ==========================================================

  const handleSave = () => {
    if (
      !taskTitle.trim() ||
      !taskDate ||
      !startTime
    ) {
      return;
    }

    if (!validateTimes()) {
      return;
    }

    const taskDetails = {
      title:
        taskTitle.trim(),

      taskDate,

      icon:
        getCategoryIcon(
          category
        ),

      startTime:
        formatTimeTo12Hour(
          startTime
        ),

      endTime: endTime
        ? formatTimeTo12Hour(
            endTime
          )
        : "",

      category,

      priority,

      activities,
    };

    const task = isEditing
      ? {
          ...selectedTask,
          ...taskDetails,
        }
      : {
          id: Date.now(),

          ...taskDetails,

          status: "pending",

          completed: false,

          createdAt:
            new Date().toISOString(),
        };

    onSaveTask(task);

    resetForm();
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          width: "100%",

          maxWidth: 620,

          maxHeight:
            "calc(100vh - 32px)",

          borderRadius: {
            xs: 2,
            sm: 2.5,
          },

          border:
            "1px solid",

          borderColor:
            "divider",

          backgroundColor:
            "background.paper",

          backgroundImage:
            "none",

          boxShadow:
            "0 24px 70px rgba(15, 23, 42, 0.18)",

          overflow: "hidden",
        },
      }}
    >
      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <Box
        sx={{
          px: {
            xs: 2,
            sm: 2.75,
          },

          pt: {
            xs: 2,
            sm: 2.5,
          },

          pb: 2,

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
              "flex-start",

            justifyContent:
              "space-between",

            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",

              gap: 1.25,

              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 42,

                height: 42,

                flexShrink: 0,

                borderRadius: 1.25,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                backgroundColor:
                  "primary.main",

                color:
                  "primary.contrastText",
              }}
            >
              {isEditing ? (
                <EventAvailableRoundedIcon />
              ) : (
                <AddRoundedIcon />
              )}
            </Box>

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "17px",
                    sm: "19px",
                  },

                  fontWeight: 700,

                  lineHeight: 1.25,

                  letterSpacing:
                    "-0.02em",
                }}
              >
                {isEditing
                  ? "Edit task"
                  : "Create a new task"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.45,

                  fontSize:
                    "10.5px",

                  color:
                    "text.secondary",

                  lineHeight: 1.45,
                }}
              >
                {isEditing
                  ? "Update the details of your task."
                  : "Capture what you want to accomplish."}
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={handleClose}
            aria-label="Close"
            size="small"
            sx={{
              width: 32,

              height: 32,

              flexShrink: 0,

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
            <CloseRoundedIcon
              sx={{
                fontSize: 19,
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* ==================================================== */}
      {/* CONTENT */}
      {/* ==================================================== */}

      <Box
        sx={{
          overflowY: "auto",

          px: {
            xs: 2,
            sm: 2.75,
          },

          py: {
            xs: 2,
            sm: 2.5,
          },

          "&::-webkit-scrollbar": {
            width: 5,
          },

          "&::-webkit-scrollbar-thumb":
            {
              backgroundColor:
                "rgba(100, 116, 139, .35)",

              borderRadius: 10,
            },
        }}
      >
        {/* ================================================== */}
        {/* TASK NAME */}
        {/* ================================================== */}

        <Box sx={{ mb: 2.75 }}>
          <Typography
            sx={{
              mb: 0.8,

              fontSize:
                "10px",

              fontWeight: 700,

              textTransform:
                "uppercase",

              letterSpacing:
                "0.07em",

              color:
                "text.secondary",
            }}
          >
            Task
          </Typography>

          <TextField
            inputRef={
              titleInputRef
            }
            fullWidth
            hiddenLabel
            placeholder="What do you want to get done?"
            value={taskTitle}
            onChange={(event) =>
              setTaskTitle(
                event.target.value
              )
            }
            sx={{
              "& .MuiOutlinedInput-root":
                {
                  minHeight: 54,

                  borderRadius: 1.5,

                  backgroundColor:
                    "action.hover",

                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                  },

                  fontWeight: 500,

                  "& fieldset": {
                    borderColor:
                      "transparent",
                  },

                  "&:hover fieldset":
                    {
                      borderColor:
                        "divider",
                    },

                  "&.Mui-focused":
                    {
                      backgroundColor:
                        "background.paper",
                    },

                  "&.Mui-focused fieldset":
                    {
                      borderColor:
                        "primary.main",

                      borderWidth: 1,
                    },
                },
            }}
          />
        </Box>

        {/* ================================================== */}
        {/* WHEN */}
        {/* ================================================== */}

        <Box sx={{ mb: 2.75 }}>
          <SectionLabel
            icon={
              <CalendarTodayRoundedIcon
                sx={{
                  fontSize: 14,
                }}
              />
            }
          >
            Schedule
          </SectionLabel>

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns:
                {
                  xs: "1fr",
                  sm: "1.15fr .925fr .925fr",
                },

              gap: 1,
            }}
          >
            {/* DATE */}

            <Box
              sx={{
                position:
                  "relative",
              }}
            >
              <TextField
                fullWidth
                hiddenLabel
                type="date"
                value={taskDate}
                onChange={(event) =>
                  setTaskDate(
                    event.target
                      .value
                  )
                }
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      minHeight: 52,

                      borderRadius: 1.5,

                      fontSize:
                        "11px",

                      "& fieldset": {
                        borderColor:
                          "divider",
                      },

                      "&:hover fieldset":
                        {
                          borderColor:
                            "text.secondary",
                        },

                      "&.Mui-focused fieldset":
                        {
                          borderColor:
                            "primary.main",
                        },
                    },
                }}
              />
            </Box>

            {/* START */}

            <TextField
              fullWidth
              hiddenLabel
              type="time"
              value={startTime}
              onChange={(event) => {
                setStartTime(
                  event.target.value
                );

                setTimeError("");
              }}
              error={Boolean(
                timeError
              )}
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    minHeight: 52,

                    borderRadius: 1.5,

                    fontSize:
                      "11px",

                    "& fieldset": {
                      borderColor:
                        "divider",
                    },

                    "&.Mui-focused fieldset":
                      {
                        borderColor:
                          "primary.main",
                      },
                  },
              }}
            />

            {/* END */}

            <TextField
              fullWidth
              hiddenLabel
              type="time"
              value={endTime}
              onChange={(event) => {
                setEndTime(
                  event.target.value
                );

                setTimeError("");
              }}
              error={Boolean(
                timeError
              )}
              placeholder="Optional"
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    minHeight: 52,

                    borderRadius: 1.5,

                    fontSize:
                      "11px",

                    "& fieldset": {
                      borderColor:
                        "divider",
                    },

                    "&.Mui-focused fieldset":
                      {
                        borderColor:
                          "primary.main",
                      },
                  },
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 0.9,

              display: "flex",

              alignItems:
                "center",

              gap: 0.6,

              minHeight: 16,
            }}
          >
            <AccessTimeRoundedIcon
              sx={{
                fontSize: 13,

                color:
                  timeError
                    ? "error.main"
                    : "text.secondary",
              }}
            />

            <Typography
              sx={{
                fontSize:
                  "9.5px",

                color:
                  timeError
                    ? "error.main"
                    : "text.secondary",
              }}
            >
              {timeError ||
                "End time is optional — perfect for tasks like Sleep at 10 PM."}
            </Typography>
          </Box>
        </Box>

        {/* ================================================== */}
        {/* PRIORITY */}
        {/* ================================================== */}

        <Box sx={{ mb: 2.75 }}>
          <SectionLabel
            icon={
              <FlagRoundedIcon
                sx={{
                  fontSize: 15,
                }}
              />
            }
          >
            Priority
          </SectionLabel>

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns:
                "repeat(3, 1fr)",

              gap: 1,
            }}
          >
            {priorities.map(
              (item) => {
                const selected =
                  priority ===
                  item.value;

                return (
                  <QuickSelectCard
                    key={
                      item.value
                    }
                    selected={
                      selected
                    }
                    onClick={() =>
                      setPriority(
                        item.value
                      )
                    }
                    icon={
                      <Box
                        sx={{
                          width: 7,

                          height: 7,

                          borderRadius:
                            "50%",

                          backgroundColor:
                            item.value ===
                            "High"
                              ? "error.main"
                              : item.value ===
                                "Medium"
                              ? "warning.main"
                              : "success.main",
                        }}
                      />
                    }
                  >
                    <Typography
                      sx={{
                        fontSize:
                          "10.5px",

                        fontWeight: 700,

                        lineHeight: 1.2,
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.3,

                        fontSize:
                          "8.5px",

                        color:
                          "text.secondary",

                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    >
                      {
                        item.description
                      }
                    </Typography>
                  </QuickSelectCard>
                );
              }
            )}
          </Box>
        </Box>

        {/* ================================================== */}
        {/* CATEGORY */}
        {/* ================================================== */}

        <Box sx={{ mb: 2.75 }}>
          <SectionLabel
            icon={
              <CategoryRoundedIcon
                sx={{
                  fontSize: 14,
                }}
              />
            }
          >
            Category
          </SectionLabel>

          <Box
            sx={{
              display: "flex",

              flexWrap: "wrap",

              gap: 0.75,
            }}
          >
            {categories.map(
              (item) => {
                const selected =
                  category ===
                  item.value;

                return (
                  <Box
                    key={
                      item.value
                    }
                    component="button"
                    type="button"
                    onClick={() =>
                      setCategory(
                        item.value
                      )
                    }
                    sx={{
                      minHeight: 34,

                      px: 1.15,

                      display:
                        "inline-flex",

                      alignItems:
                        "center",

                      gap: 0.6,

                      border:
                        "1px solid",

                      borderColor:
                        selected
                          ? "primary.main"
                          : "divider",

                      borderRadius:
                        1,

                      backgroundColor:
                        selected
                          ? "rgba(59, 130, 246, 0.07)"
                          : "background.paper",

                      color:
                        selected
                          ? "primary.main"
                          : "text.secondary",

                      cursor:
                        "pointer",

                      fontSize:
                        "10px",

                      fontWeight:
                        selected
                          ? 700
                          : 500,

                      transition:
                        "all .18s ease",

                      "&:hover": {
                        borderColor:
                          "primary.main",

                        color:
                          "primary.main",
                      },
                    }}
                  >
                    <span
                      style={{
                        fontSize:
                          "13px",
                      }}
                    >
                      {
                        item.icon
                      }
                    </span>

                    {
                      item.value
                    }
                  </Box>
                );
              }
            )}
          </Box>
        </Box>

        {/* ================================================== */}
        {/* ACTIVITIES */}
        {/* ================================================== */}

        <Box>
          <SectionLabel
            icon={
              <CheckRoundedIcon
                sx={{
                  fontSize: 15,
                }}
              />
            }
            optional
          >
            Checklist
          </SectionLabel>

          <Box
            sx={{
              display: "flex",

              gap: 0.75,

              alignItems:
                "stretch",
            }}
          >
            <TextField
              fullWidth
              hiddenLabel
              placeholder="Add a step or activity..."
              value={activity}
              onChange={(event) =>
                setActivity(
                  event.target.value
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key ===
                  "Enter"
                ) {
                  event.preventDefault();

                  handleAddActivity();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    minHeight: 46,

                    borderRadius:
                      1.25,

                    backgroundColor:
                      "action.hover",

                    fontSize:
                      "11px",

                    "& fieldset": {
                      borderColor:
                        "transparent",
                    },

                    "&:hover fieldset":
                      {
                        borderColor:
                          "divider",
                      },

                    "&.Mui-focused fieldset":
                      {
                        borderColor:
                          "primary.main",
                      },
                  },
              }}
            />

            <IconButton
              onClick={
                handleAddActivity
              }
              disabled={
                !activity.trim()
              }
              aria-label="Add activity"
              sx={{
                width: 46,

                height: 46,

                flexShrink: 0,

                borderRadius:
                  1.25,

                border:
                  "1px solid",

                borderColor:
                  activity.trim()
                    ? "primary.main"
                    : "divider",

                backgroundColor:
                  activity.trim()
                    ? "primary.main"
                    : "action.hover",

                color:
                  activity.trim()
                    ? "primary.contrastText"
                    : "text.disabled",

                "&:hover": {
                  backgroundColor:
                    "primary.dark",

                  color:
                    "primary.contrastText",
                },
              }}
            >
              <AddRoundedIcon
                sx={{
                  fontSize: 19,
                }}
              />
            </IconButton>
          </Box>

          {/* ACTIVITY ITEMS */}

          {activities.length >
            0 && (
            <Box
              sx={{
                mt: 1,

                display: "flex",

                flexDirection:
                  "column",

                gap: 0.6,
              }}
            >
              {activities.map(
                (
                  item,
                  index
                ) => (
                  <Box
                    key={`${item}-${index}`}
                    sx={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap: 1,

                      minHeight: 40,

                      px: 1,

                      border:
                        "1px solid",

                      borderColor:
                        "divider",

                      borderRadius:
                        1,

                      backgroundColor:
                        "background.paper",
                    }}
                  >
                    <Box
                      sx={{
                        width: 21,

                        height: 21,

                        flexShrink: 0,

                        borderRadius:
                          "50%",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        border:
                          "1px solid",

                        borderColor:
                          "divider",

                        color:
                          "text.secondary",

                        fontSize:
                          "8px",

                        fontWeight:
                          700,
                      }}
                    >
                      {index + 1}
                    </Box>

                    <Typography
                      sx={{
                        flexGrow: 1,

                        minWidth: 0,

                        fontSize:
                          "10.5px",

                        color:
                          "text.primary",

                        overflow:
                          "hidden",

                        textOverflow:
                          "ellipsis",

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {item}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() =>
                        handleRemoveActivity(
                          index
                        )
                      }
                      aria-label={`Remove ${item}`}
                      sx={{
                        width: 28,

                        height: 28,

                        color:
                          "text.secondary",

                        borderRadius:
                          0.75,

                        "&:hover": {
                          color:
                            "error.main",

                          backgroundColor:
                            "rgba(239, 68, 68, .06)",
                        },
                      }}
                    >
                      <DeleteOutlineRoundedIcon
                        sx={{
                          fontSize:
                            16,
                        }}
                      />
                    </IconButton>
                  </Box>
                )
              )}
            </Box>
          )}

          {activities.length ===
            0 && (
            <Typography
              sx={{
                mt: 0.8,

                fontSize:
                  "9px",

                color:
                  "text.secondary",
              }}
            >
              Optional — add smaller
              steps if this task needs
              a checklist.
            </Typography>
          )}
        </Box>
      </Box>

      {/* ==================================================== */}
      {/* FOOTER */}
      {/* ==================================================== */}

      <Box
        sx={{
          px: {
            xs: 2,
            sm: 2.75,
          },

          py: 1.5,

          borderTop:
            "1px solid",

          borderColor:
            "divider",

          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          gap: 2,

          backgroundColor:
            "background.paper",
        }}
      >
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },

            fontSize:
              "9.5px",

            color:
              "text.secondary",
          }}
        >
          Press Enter to add a
          checklist item
        </Typography>

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 0.75,

            ml: {
              xs: "auto",
              sm: 0,
            },
          }}
        >
          <Button
            onClick={
              handleClose
            }
            sx={{
              minHeight: 38,

              px: 1.5,

              borderRadius: 1,

              color:
                "text.secondary",

              fontSize:
                "10.5px",

              fontWeight: 600,

              textTransform:
                "none",

              "&:hover": {
                backgroundColor:
                  "action.hover",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              !taskTitle.trim() ||
              !taskDate ||
              !startTime
            }
            startIcon={
              isEditing ? (
                <EventAvailableRoundedIcon
                  sx={{
                    fontSize:
                      "16px !important",
                  }}
                />
              ) : (
                <AddRoundedIcon
                  sx={{
                    fontSize:
                      "17px !important",
                  }}
                />
              )
            }
            sx={{
              minHeight: 38,

              px: 1.75,

              borderRadius: 1,

              fontSize:
                "10.5px",

              fontWeight: 700,

              textTransform:
                "none",

              boxShadow: "none",

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            {isEditing
              ? "Update Task"
              : "Create Task"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddTaskDialog;