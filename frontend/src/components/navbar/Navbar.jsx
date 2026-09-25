import {
  useRef,
  useState,
} from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Badge,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Paper,
  ClickAwayListener,
  Chip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";

import { useNavigate } from "react-router-dom";

import useTasks from "../../hooks/useTasks";

import {
  useThemeContext,
} from "../../context/ThemeContext";

import {
  useAuth,
} from "../../context/AuthContext";

// ==========================================
// NAVBAR
// ==========================================

const Navbar = ({
  onMenuClick,
  drawerWidth,
}) => {

  const navigate = useNavigate();

  // ========================================
  // AUTHENTICATION
  // ========================================

  const {
    user,
    logout,
  } = useAuth();

  // ========================================
  // TASKS
  // ========================================

  const {
    tasks,
  } = useTasks();

  // ========================================
  // THEME
  // ========================================

  const {
    isDarkMode,
    toggleTheme,
  } = useThemeContext();

  // ========================================
  // PROFILE MENU
  // ========================================

  const [anchorEl, setAnchorEl] =
    useState(null);

  const profileButtonRef =
    useRef(null);

  const isProfileMenuOpen =
    Boolean(anchorEl);

  // ========================================
  // SEARCH
  // ========================================

  const [searchValue, setSearchValue] =
    useState("");

  const [searchOpen, setSearchOpen] =
    useState(false);

  // ========================================
  // PROFILE DATA
  // ========================================

  const profile = {
    name:
      user?.username ||
      "User",

    role:
      user?.role ||
      "USER",

    email:
      user?.email ||
      "",
  };

  // ========================================
  // PROFILE MENU OPEN
  // ========================================

  const handleProfileClick = (
    event
  ) => {
    setAnchorEl(
      event.currentTarget
    );
  };

  // ========================================
  // RESTORE PROFILE FOCUS
  // ========================================

  const restoreProfileFocus = () => {
    requestAnimationFrame(() => {
      profileButtonRef.current?.focus();
    });
  };

  // ========================================
  // CLOSE PROFILE MENU
  // ========================================

  const handleProfileClose = () => {
    setAnchorEl(null);

    restoreProfileFocus();
  };

  // ========================================
  // PROFILE NAVIGATION
  // ========================================

  const handleProfileNavigation = () => {
    setAnchorEl(null);

    navigate("/profile");
  };

  // ========================================
  // SETTINGS NAVIGATION
  // ========================================

  const handleSettingsNavigation = () => {
    setAnchorEl(null);

    navigate("/settings");
  };

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    setAnchorEl(null);

    logout();

    navigate("/login", {
      replace: true,
    });
  };

  // ========================================
  // SEARCH NORMALIZATION
  // ========================================

  const normalizedSearch =
    searchValue
      .trim()
      .toLowerCase();

  // ========================================
  // SEARCH RESULTS
  // ========================================

  const searchResults =
    normalizedSearch.length === 0
      ? []
      : tasks
          .filter((task) => {

            const title =
              task.title
                ?.toLowerCase() || "";

            const category =
              task.category
                ?.toLowerCase() || "";

            const priority =
              task.priority
                ?.toLowerCase() || "";

            return (
              title.includes(
                normalizedSearch
              ) ||
              category.includes(
                normalizedSearch
              ) ||
              priority.includes(
                normalizedSearch
              )
            );
          })
          .slice(0, 6);

  // ========================================
  // SEARCH CHANGE
  // ========================================

  const handleSearchChange = (
    event
  ) => {

    const value =
      event.target.value;

    setSearchValue(value);

    setSearchOpen(
      value.trim().length > 0
    );
  };

  // ========================================
  // SEARCH FOCUS
  // ========================================

  const handleSearchFocus = () => {

    if (
      searchValue.trim().length > 0
    ) {
      setSearchOpen(true);
    }
  };

  // ========================================
  // SEARCH RESULT CLICK
  // ========================================

  const handleSearchResultClick = (
    task
  ) => {

    setSearchValue("");

    setSearchOpen(false);

    navigate("/planner", {
      state: {
        searchTaskId: task.id,
      },
    });
  };

  // ========================================
  // VIEW ALL TASKS
  // ========================================

  const handleViewAllTasks = () => {

    setSearchValue("");

    setSearchOpen(false);

    navigate("/planner");
  };

  // ========================================
  // CLEAR SEARCH
  // ========================================

  const handleClearSearch = () => {

    setSearchValue("");

    setSearchOpen(false);
  };

  // ========================================
  // AVATAR LETTER
  // ========================================

  const avatarLetter =
    profile.name
      ?.trim()
      .charAt(0)
      .toUpperCase() || "U";

  // ========================================
  // UI
  // ========================================

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor:
          "background.paper",

        color:
          "text.primary",

        borderBottom:
          "1px solid",

        borderColor:
          "divider",

        width: {
          xs: "100%",
          md: `calc(100% - ${drawerWidth}px)`,
        },

        ml: {
          xs: 0,
          md: `${drawerWidth}px`,
        },

        zIndex: (theme) =>
          theme.zIndex.drawer + 1,
      }}
    >

      <Toolbar
        sx={{
          minHeight:
            "64px !important",

          px: {
            xs: 1.5,
            sm: 2.5,
            md: 3,
          },

          gap: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },
        }}
      >

        {/* ==================================
            MOBILE MENU
        ================================== */}

        <IconButton
          color="inherit"
          edge="start"
          aria-label="open navigation menu"
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            width: 38,
            height: 38,

            border:
              "1px solid",

            borderColor:
              "divider",

            borderRadius: 1.5,
          }}
        >
          <MenuIcon
            sx={{
              fontSize: 20,
            }}
          />
        </IconButton>

        {/* ==================================
            SEARCH
        ================================== */}

        <ClickAwayListener
          onClickAway={() =>
            setSearchOpen(false)
          }
        >

          <Box
            sx={{
              position: "relative",

              width: {
                xs: "100%",
                sm: 300,
                md: 360,
                lg: 400,
              },

              maxWidth: {
                xs: "none",
                sm: 400,
              },
            }}
          >

            <Box
              sx={{
                height: 38,

                display: "flex",

                alignItems: "center",

                backgroundColor:
                  "action.hover",

                border:
                  "1px solid",

                borderColor:
                  searchOpen
                    ? "primary.main"
                    : "divider",

                borderRadius: 1.5,

                px: 1.25,

                transition:
                  "border-color 0.2s ease, box-shadow 0.2s ease",

                "&:focus-within": {
                  borderColor:
                    "primary.main",

                  boxShadow:
                    "0 0 0 3px rgba(79, 70, 229, 0.08)",
                },
              }}
            >

              <SearchIcon
                sx={{
                  color:
                    "text.secondary",

                  fontSize: 19,

                  mr: 1,
                }}
              />

              <InputBase
                placeholder="Search tasks..."
                fullWidth
                value={searchValue}
                onChange={
                  handleSearchChange
                }
                onFocus={
                  handleSearchFocus
                }
                inputProps={{
                  "aria-label":
                    "search tasks",
                }}
                sx={{
                  color:
                    "text.primary",

                  fontSize: "13px",

                  "& input": {
                    py: 0,
                  },

                  "& input::placeholder": {
                    color:
                      "text.secondary",

                    opacity: 1,
                  },
                }}
              />

              {/* Search shortcut */}

              {!searchValue && (
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                    },

                    alignItems:
                      "center",

                    gap: 0.3,

                    ml: 1,

                    px: 0.6,

                    height: 22,

                    border:
                      "1px solid",

                    borderColor:
                      "divider",

                    borderRadius: 0.75,

                    color:
                      "text.secondary",
                  }}
                >

                  <KeyboardCommandKeyIcon
                    sx={{
                      fontSize: 13,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 10,

                      fontFamily:
                        '"JetBrains Mono", monospace',
                    }}
                  >
                    K
                  </Typography>

                </Box>
              )}

              {searchValue && (
                <IconButton
                  size="small"
                  onClick={
                    handleClearSearch
                  }
                  aria-label="clear search"
                  sx={{
                    width: 26,
                    height: 26,
                  }}
                >

                  <CloseIcon
                    sx={{
                      fontSize: 16,
                    }}
                  />

                </IconButton>
              )}

            </Box>

            {/* =================================
                SEARCH DROPDOWN
            ================================= */}

            {searchOpen && (
              <Paper
                elevation={0}
                sx={{
                  position:
                    "absolute",

                  top:
                    "calc(100% + 8px)",

                  left: 0,

                  right: 0,

                  maxHeight: 390,

                  overflowY: "auto",

                  border:
                    "1px solid",

                  borderColor:
                    "divider",

                  borderRadius: 1.5,

                  boxShadow:
                    "0 12px 32px rgba(15, 23, 42, 0.12)",

                  zIndex: 2000,
                }}
              >

                {searchResults.length >
                0 ? (
                  <>

                    <Box
                      sx={{
                        px: 1.75,
                        pt: 1.5,
                        pb: 0.75,
                      }}
                    >

                      <Typography
                        sx={{
                          fontSize:
                            "10px",

                          fontWeight: 700,

                          fontFamily:
                            '"JetBrains Mono", monospace',

                          color:
                            "text.secondary",

                          textTransform:
                            "uppercase",

                          letterSpacing:
                            "0.06em",
                        }}
                      >
                        Matching Tasks
                      </Typography>

                    </Box>

                    {searchResults.map(
                      (task) => (

                        <MenuItem
                          key={task.id}
                          onClick={() =>
                            handleSearchResultClick(
                              task
                            )
                          }
                          sx={{
                            px: 1.75,

                            py: 1.1,

                            gap: 1.25,

                            "&:hover": {
                              backgroundColor:
                                "action.hover",
                            },
                          }}
                        >

                          <Box
                            sx={{
                              width: 32,
                              height: 32,

                              borderRadius: 1,

                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "center",

                              backgroundColor:
                                "action.hover",

                              flexShrink: 0,
                            }}
                          >

                            <Typography
                              sx={{
                                fontSize:
                                  "1rem",
                              }}
                            >
                              {task.icon ||
                                "📝"}
                            </Typography>

                          </Box>

                          <Box
                            sx={{
                              minWidth: 0,
                              flexGrow: 1,
                            }}
                          >

                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,

                                fontSize:
                                  "13px",
                              }}
                              noWrap
                            >
                              {task.title}
                            </Typography>

                            <Box
                              sx={{
                                display:
                                  "flex",

                                alignItems:
                                  "center",

                                gap: 0.75,

                                mt: 0.3,

                                minWidth: 0,
                              }}
                            >

                              <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                              >
                                {task.startTime ||
                                  "No time"}
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                •
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                              >
                                {task.category ||
                                  "General"}
                              </Typography>

                            </Box>

                          </Box>

                          <Chip
                            label={
                              task.priority ||
                              "Medium"
                            }
                            size="small"
                            variant="outlined"
                            sx={{
                              display: {
                                xs: "none",
                                sm: "inline-flex",
                              },

                              flexShrink: 0,

                              height: 22,

                              fontSize:
                                "9px",

                              textTransform:
                                "uppercase",
                            }}
                          />

                        </MenuItem>
                      )
                    )}

                    <Divider />

                    <MenuItem
                      onClick={
                        handleViewAllTasks
                      }
                      sx={{
                        minHeight: 42,

                        justifyContent:
                          "center",

                        color:
                          "primary.main",

                        fontSize:
                          "12px",

                        fontWeight: 600,

                        gap: 0.75,
                      }}
                    >

                      View all tasks

                      <ArrowForwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />

                    </MenuItem>

                  </>
                ) : (

                  <Box
                    sx={{
                      px: 2,
                      py: 3,

                      textAlign:
                        "center",
                    }}
                  >

                    <Box
                      sx={{
                        width: 38,
                        height: 38,

                        mx: "auto",
                        mb: 1,

                        borderRadius: 1,

                        display: "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        backgroundColor:
                          "action.hover",
                      }}
                    >

                      <SearchIcon
                        sx={{
                          color:
                            "text.secondary",
                        }}
                      />

                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      No tasks found
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Try another task
                      name or category.
                    </Typography>

                  </Box>
                )}

              </Paper>
            )}

          </Box>

        </ClickAwayListener>

        {/* ==================================
            SPACER
        ================================== */}

        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        {/* ==================================
            NOTIFICATIONS
        ================================== */}

        <Tooltip title="Notifications">

          <IconButton
            color="inherit"
            aria-label="notifications"
            sx={{
              width: 38,
              height: 38,

              display: {
                xs: "none",
                sm: "inline-flex",
              },
            }}
          >

            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 9,

                  minWidth: 15,

                  height: 15,

                  padding: 0,
                },
              }}
            >

              <NotificationsNoneOutlinedIcon
                sx={{
                  fontSize: 20,
                }}
              />

            </Badge>

          </IconButton>

        </Tooltip>

        {/* ==================================
            THEME
        ================================== */}

        <Tooltip
          title={
            isDarkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >

          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            sx={{
              width: 38,
              height: 38,
            }}
          >

            {isDarkMode ? (
              <LightModeOutlinedIcon
                sx={{
                  fontSize: 20,
                }}
              />
            ) : (
              <DarkModeOutlinedIcon
                sx={{
                  fontSize: 20,
                }}
              />
            )}

          </IconButton>

        </Tooltip>

        {/* ==================================
            PROFILE BUTTON
        ================================== */}

        <Box
          ref={profileButtonRef}
          component="button"
          type="button"
          id="profile-menu-button"
          onClick={
            handleProfileClick
          }
          aria-label="Open profile menu"
          aria-haspopup="true"
          aria-expanded={
            isProfileMenuOpen
          }
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 1,

            cursor: "pointer",

            ml: 0.5,

            p: "3px 5px",

            border: 0,

            borderRadius: 1.5,

            backgroundColor:
              "transparent",

            color: "inherit",

            font: "inherit",

            textAlign: "left",

            transition:
              "background-color 0.2s ease",

            "&:hover": {
              backgroundColor:
                "action.hover",
            },

            "&:focus-visible": {
              outline:
                "2px solid",

              outlineColor:
                "primary.main",

              outlineOffset: 2,
            },
          }}
        >

          <Avatar
            alt={
              profile.name ||
              "Profile"
            }
            sx={{
              width: 34,

              height: 34,

              backgroundColor:
                "primary.main",

              fontSize: "0.8rem",

              fontWeight: 700,
            }}
          >
            {avatarLetter}
          </Avatar>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },

              minWidth: 70,
            }}
          >

            <Typography
              sx={{
                fontSize: "12px",

                fontWeight: 600,

                color:
                  "text.primary",

                lineHeight: 1.2,
              }}
              noWrap
            >
              {profile.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.25,

                fontSize: "10px",

                color:
                  "text.secondary",

                lineHeight: 1.2,
              }}
              noWrap
            >
              {profile.role}
            </Typography>

          </Box>

        </Box>

        {/* ==================================
            PROFILE MENU
        ================================== */}

        <Menu
          anchorEl={anchorEl}
          open={isProfileMenuOpen}
          onClose={
            handleProfileClose
          }
          MenuListProps={{
            "aria-labelledby":
              "profile-menu-button",
          }}
          PaperProps={{
            sx: {
              mt: 1,

              minWidth: 230,

              border:
                "1px solid",

              borderColor:
                "divider",

              borderRadius: 1.5,

              boxShadow:
                "0 12px 32px rgba(15, 23, 42, 0.12)",
            },
          }}
        >

          {/* PROFILE HEADER */}

          <Box
            sx={{
              px: 2,

              py: 1.5,
            }}
          >

            <Typography
              sx={{
                fontSize: "13px",

                fontWeight: 700,
              }}
            >
              {profile.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.3,

                fontSize: "11px",

                color:
                  "text.secondary",
              }}
              noWrap
            >
              {profile.email}
            </Typography>

            <Chip
              label={profile.role}
              size="small"
              sx={{
                mt: 1,

                height: 22,

                fontSize: "9px",

                fontWeight: 600,
              }}
            />

          </Box>

          <Divider />

          {/* PROFILE */}

          <MenuItem
            onClick={
              handleProfileNavigation
            }
            sx={{
              py: 1.1,
            }}
          >

            <ListItemIcon>

              <PersonOutlineOutlinedIcon
                fontSize="small"
              />

            </ListItemIcon>

            <Box>

              <Typography
                sx={{
                  fontSize: "13px",

                  fontWeight: 600,
                }}
              >
                Profile
              </Typography>

              <Typography
                sx={{
                  fontSize: "10px",

                  color:
                    "text.secondary",
                }}
              >
                View your profile
              </Typography>

            </Box>

          </MenuItem>

          {/* SETTINGS */}

          <MenuItem
            onClick={
              handleSettingsNavigation
            }
            sx={{
              py: 1.1,
            }}
          >

            <ListItemIcon>

              <SettingsOutlinedIcon
                fontSize="small"
              />

            </ListItemIcon>

            <Box>

              <Typography
                sx={{
                  fontSize: "13px",

                  fontWeight: 600,
                }}
              >
                Settings
              </Typography>

              <Typography
                sx={{
                  fontSize: "10px",

                  color:
                    "text.secondary",
                }}
              >
                Manage preferences
              </Typography>

            </Box>

          </MenuItem>

          <Divider />

          {/* LOGOUT */}

          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.1,
            }}
          >

            <ListItemIcon>

              <LogoutOutlinedIcon
                fontSize="small"
                sx={{
                  color:
                    "error.main",
                }}
              />

            </ListItemIcon>

            <Typography
              sx={{
                fontSize: "13px",

                fontWeight: 600,

                color:
                  "error.main",
              }}
            >
              Logout
            </Typography>

          </MenuItem>

        </Menu>

      </Toolbar>

    </AppBar>
  );
};

export default Navbar;