import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import useTasks from "../../hooks/useTasks";
import { useThemeContext } from "../../context/ThemeContext";

// ==========================================
// STORAGE KEY
// ==========================================

const SETTINGS_STORAGE_KEY =
  "productivity_tracker_settings";

// ==========================================
// DEFAULT SETTINGS
// ==========================================

const DEFAULT_SETTINGS = {
  defaultPriority: "High",
  showCompletedTasks: true,
};

// ==========================================
// LOAD SETTINGS
// ==========================================

const getSavedSettings = () => {
  try {
    const savedSettings =
      localStorage.getItem(
        SETTINGS_STORAGE_KEY
      );

    if (!savedSettings) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(savedSettings),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

// ==========================================
// SETTINGS PAGE
// ==========================================

const Settings = () => {
  const { tasks } = useTasks();

  const {
    mode,
    isDarkMode,
    toggleTheme,
  } = useThemeContext();

  const [settings, setSettings] =
    useState(getSavedSettings);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(settings)
    );
  }, [settings]);

  // ==========================================
  // DEFAULT PRIORITY
  // ==========================================

  const handlePriorityChange = (
    event
  ) => {
    setSettings((previous) => ({
      ...previous,
      defaultPriority:
        event.target.value,
    }));
  };

  // ==========================================
  // SHOW COMPLETED TASKS
  // ==========================================

  const handleCompletedTasksChange = (
    event
  ) => {
    setSettings((previous) => ({
      ...previous,
      showCompletedTasks:
        event.target.checked,
    }));
  };

  // ==========================================
  // OPEN DELETE DIALOG
  // ==========================================

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  // ==========================================
  // CLOSE DELETE DIALOG
  // ==========================================

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // ==========================================
  // CLEAR APPLICATION DATA
  // ==========================================

  const handleClearData = () => {
    localStorage.clear();

    setDeleteDialogOpen(false);

    window.location.reload();
  };

  // ==========================================
  // THEME LABEL
  // ==========================================

  const themeLabel = isDarkMode
    ? "Dark"
    : "Light";

  // ==========================================
  // UI
  // ==========================================

  return (
    <Box
      sx={{
        width: "100%",

        maxWidth: 1400,

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
            },

            fontWeight: 700,

            lineHeight: 1.2,

            letterSpacing:
              "-0.02em",
          }}
        >
          Settings
        </Typography>

        <Typography
          sx={{
            mt: 0.6,

            fontSize: "12px",

            color:
              "text.secondary",

            lineHeight: 1.5,
          }}
        >
          Customize your productivity
          experience and manage
          application data.
        </Typography>
      </Box>

      {/* ====================================== */}
      {/* SETTINGS GRID */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            lg:
              "minmax(0, 1.4fr) minmax(280px, 0.6fr)",
          },

          gap: 2,

          alignItems: "start",
        }}
      >
        {/* ==================================== */}
        {/* LEFT COLUMN */}
        {/* ==================================== */}

        <Box
          sx={{
            display: "flex",

            flexDirection:
              "column",

            gap: 2,
          }}
        >
          {/* ================================= */}
          {/* TASK PREFERENCES */}
          {/* ================================= */}

          <SettingsCard
            icon={
              <TuneOutlinedIcon />
            }
            title="Task Preferences"
            description="Configure your default task behavior."
          >
            <SettingRow
              title="Default Priority"
              description="Priority automatically selected when creating a new task."
            >
              <FormControl
                size="small"
                sx={{
                  minWidth: {
                    xs: "100%",
                    sm: 180,
                  },
                }}
              >
                <InputLabel>
                  Priority
                </InputLabel>

                <Select
                  value={
                    settings.defaultPriority
                  }
                  label="Priority"
                  onChange={
                    handlePriorityChange
                  }
                  sx={{
                    borderRadius: 1,

                    fontSize: "12px",
                  }}
                >
                  <MenuItem value="High">
                    High
                  </MenuItem>

                  <MenuItem value="Medium">
                    Medium
                  </MenuItem>

                  <MenuItem value="Low">
                    Low
                  </MenuItem>
                </Select>
              </FormControl>
            </SettingRow>
          </SettingsCard>

          {/* ================================= */}
          {/* DISPLAY PREFERENCES */}
          {/* ================================= */}

          <SettingsCard
            icon={
              <DisplaySettingsOutlinedIcon />
            }
            title="Display Preferences"
            description="Control how information appears in your workspace."
          >
            <SettingRow
              title="Show Completed Tasks"
              description="Keep completed tasks visible in your task lists."
            >
              <Switch
                checked={
                  settings.showCompletedTasks
                }
                onChange={
                  handleCompletedTasksChange
                }
              />
            </SettingRow>
          </SettingsCard>

          {/* ================================= */}
          {/* APPEARANCE */}
          {/* ================================= */}

          <SettingsCard
            icon={
              <PaletteOutlinedIcon />
            }
            title="Appearance"
            description="Choose how the productivity tracker looks."
          >
            <SettingRow
              title="Theme"
              description={`Currently using ${themeLabel.toLowerCase()} mode.`}
            >
              <Button
                variant="outlined"
                size="small"
                startIcon={
                  isDarkMode ? (
                    <DarkModeOutlinedIcon />
                  ) : (
                    <LightModeOutlinedIcon />
                  )
                }
                onClick={toggleTheme}
                sx={{
                  minWidth: 120,

                  minHeight: 36,

                  borderRadius: 1,

                  textTransform:
                    "none",

                  fontSize: "11px",

                  fontWeight: 600,
                }}
              >
                {themeLabel} Mode
              </Button>
            </SettingRow>
          </SettingsCard>
        </Box>

        {/* ==================================== */}
        {/* RIGHT COLUMN */}
        {/* ==================================== */}

        <Box
          sx={{
            display: "flex",

            flexDirection:
              "column",

            gap: 2,
          }}
        >
          {/* ================================= */}
          {/* WORKSPACE SUMMARY */}
          {/* ================================= */}

          <Card
            sx={{
              border: "1px solid",

              borderColor:
                "divider",

              borderRadius: 1.5,

              boxShadow: "none",

              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: 3,

                backgroundColor:
                  "primary.main",
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
              <Typography
                sx={{
                  fontSize: "13px",

                  fontWeight: 700,
                }}
              >
                Workspace Summary
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,

                  fontSize: "10px",

                  color:
                    "text.secondary",
                }}
              >
                Current productivity
                data.
              </Typography>

              <Divider
                sx={{
                  my: 2,
                }}
              />

              <SummaryStat
                icon={
                  <TaskAltOutlinedIcon />
                }
                label="Total Tasks"
                value={tasks.length}
                color="primary.main"
              />

              <SummaryStat
                icon={
                  <StorageOutlinedIcon />
                }
                label="Stored Locally"
                value="Yes"
                color="success.main"
              />

              <SummaryStat
                icon={
                  isDarkMode ? (
                    <DarkModeOutlinedIcon />
                  ) : (
                    <LightModeOutlinedIcon />
                  )
                }
                label="Theme"
                value={themeLabel}
                color="warning.main"
              />
            </CardContent>
          </Card>

          {/* ================================= */}
          {/* DATA MANAGEMENT */}
          {/* ================================= */}

          <Card
            sx={{
              border: "1px solid",

              borderColor:
                "error.light",

              borderRadius: 1.5,

              boxShadow: "none",

              backgroundColor:
                "error.main",
            }}
          >
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

                  alignItems:
                    "flex-start",

                  gap: 1.25,
                }}
              >
                <Box
                  sx={{
                    width: 34,

                    height: 34,

                    flexShrink: 0,

                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    borderRadius: 1,

                    backgroundColor:
                      "rgba(255,255,255,0.16)",

                    color:
                      "inherit",
                  }}
                >
                  <StorageOutlinedIcon
                    sx={{
                      fontSize: 18,
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
                        "13px",

                      fontWeight: 700,

                      color:
                        "inherit",
                    }}
                  >
                    Data Management
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.4,

                      fontSize:
                        "10px",

                      lineHeight: 1.5,

                      opacity: 0.85,

                      color:
                        "inherit",
                    }}
                  >
                    Your tasks and
                    settings are
                    stored locally
                    in this browser.
                  </Typography>
                </Box>
              </Box>

              <Divider
                sx={{
                  my: 2,

                  borderColor:
                    "rgba(255,255,255,0.2)",
                }}
              />

              <Box
                sx={{
                  display: "flex",

                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },

                  alignItems: {
                    xs: "stretch",
                    sm: "center",
                  },

                  justifyContent:
                    "space-between",

                  gap: 1.5,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize:
                        "11px",

                      fontWeight: 600,

                      color:
                        "inherit",
                    }}
                  >
                    Clear all data
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,

                      fontSize:
                        "10px",

                      opacity: 0.8,

                      color:
                        "inherit",
                    }}
                  >
                    {tasks.length} task
                    {tasks.length === 1
                      ? ""
                      : "s"} currently
                    stored.
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  startIcon={
                    <DeleteOutlineOutlinedIcon />
                  }
                  onClick={
                    handleOpenDeleteDialog
                  }
                  sx={{
                    minHeight: 36,

                    borderRadius: 1,

                    px: 1.75,

                    textTransform:
                      "none",

                    fontSize: "11px",

                    fontWeight: 600,

                    width: {
                      xs: "100%",
                      sm: "auto",
                    },

                    borderColor:
                      "rgba(255,255,255,0.55)",

                    "&:hover": {
                      borderColor:
                        "inherit",

                      backgroundColor:
                        "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Clear Data
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* ====================================== */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ====================================== */}

      <Dialog
        open={deleteDialogOpen}
        onClose={
          handleCloseDeleteDialog
        }
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",

            alignItems:
              "center",

            gap: 1,

            fontSize: "17px",

            fontWeight: 700,
          }}
        >
          <WarningAmberRoundedIcon
            color="error"
          />

          Clear all data?
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "12px",

              lineHeight: 1.6,
            }}
          >
            This will remove your
            locally stored tasks,
            profile information,
            settings, and saved
            theme preference.
          </DialogContentText>

          <Box
            sx={{
              mt: 2,

              p: 1.5,

              borderRadius: 1,

              backgroundColor:
                "error.lighter",
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",

                color:
                  "error.main",

                fontWeight: 600,
              }}
            >
              This action cannot be
              undone.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,

            gap: 1,
          }}
        >
          <Button
            onClick={
              handleCloseDeleteDialog
            }
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 1,

              textTransform:
                "none",

              fontSize: "11px",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleClearData}
            color="error"
            variant="contained"
            size="small"
            startIcon={
              <DeleteOutlineOutlinedIcon />
            }
            sx={{
              borderRadius: 1,

              textTransform:
                "none",

              fontSize: "11px",

              fontWeight: 600,

              boxShadow: "none",

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Clear Everything
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ==========================================
// SETTINGS CARD
// ==========================================

const SettingsCard = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <Card
      sx={{
        border: "1px solid",

        borderColor:
          "divider",

        borderRadius: 1.5,

        boxShadow: "none",
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
        {/* HEADER */}

        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 32,

              height: 32,

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              borderRadius: 1,

              backgroundColor:
                "action.hover",

              color:
                "primary.main",

              "& svg": {
                fontSize: 17,
              },
            }}
          >
            {icon}
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize:
                  "13px",

                fontWeight: 700,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.2,

                fontSize:
                  "10px",

                color:
                  "text.secondary",
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            my: 2,
          }}
        />

        {children}
      </CardContent>
    </Card>
  );
};

// ==========================================
// SETTING ROW
// ==========================================

const SettingRow = ({
  title,
  description,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",

        alignItems: {
          xs: "stretch",
          sm: "center",
        },

        justifyContent:
          "space-between",

        gap: 2,

        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      <Box
        sx={{
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize:
              "12px",

            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.35,

            fontSize:
              "10px",

            color:
              "text.secondary",

            lineHeight: 1.5,

            maxWidth: 520,
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          flexShrink: 0,

          width: {
            xs: "100%",
            sm: "auto",
          },

          display: "flex",

          justifyContent: {
            xs: "flex-start",
            sm: "flex-end",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

// ==========================================
// SUMMARY STAT
// ==========================================

const SummaryStat = ({
  icon,
  label,
  value,
  color,
}) => {
  return (
    <Box
      sx={{
        display: "flex",

        alignItems:
          "center",

        justifyContent:
          "space-between",

        gap: 1.5,

        py: 1,

        "& + &": {
          borderTop:
            "1px solid",

          borderColor:
            "divider",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",

          alignItems:
            "center",

          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 28,

            height: 28,

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            borderRadius: 1,

            backgroundColor:
              "action.hover",

            color,

            "& svg": {
              fontSize: 15,
            },
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontSize:
              "10px",

            color:
              "text.secondary",

            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
      </Box>

      <Chip
        label={value}
        size="small"
        sx={{
          height: 24,

          fontSize:
            "10px",

          fontWeight: 700,
        }}
      />
    </Box>
  );
};

export default Settings;