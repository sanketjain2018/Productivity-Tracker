import {
  Box,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";

import { useState } from "react";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// ==========================================
// FAQ DATA
// ==========================================

const FAQ_ITEMS = [
  {
    question: "How do I create a new task?",
    answer:
      'Open Planner and click "Add Task". Enter the task title, description, priority and due date, then save the task. The task is stored in the backend and associated with your account.',
  },
  {
    question: "Can I edit or delete a task?",
    answer:
      "Yes. Open Planner and use the Edit or Delete action on the task card. Changes are saved through the backend and remain available when you log in again.",
  },
  {
    question: "How does task completion work?",
    answer:
      'Use the "Mark as Done" action on a task. The task status changes to COMPLETED and the updated status is reflected across the Dashboard, Planner, Calendar and Analytics sections.',
  },
  {
    question: "How does task priority work?",
    answer:
      "Each task can have High, Medium or Low priority. Priority helps you organize your work and is also used by Analytics to show your task distribution.",
  },
  {
    question: "How does the Calendar work?",
    answer:
      "Calendar displays tasks according to their due date. Select a date to view the tasks scheduled for that day. Calendar data is loaded from the backend for your authenticated account.",
  },
  {
    question: "Where is my task data stored?",
    answer:
      "Task data is stored in the application's backend database. The application uses Spring Boot APIs and MySQL for persistent storage. Your tasks are associated with your authenticated user account.",
  },
  {
    question: "How does login and security work?",
    answer:
      "The application uses username/password authentication with JWT-based security. After successful login, the application uses the JWT token to authenticate protected API requests.",
  },
  {
    question: "What happens if my session expires?",
    answer:
      "If the backend returns an unauthorized response, the application clears the current authentication information and redirects you to the Login page so you can authenticate again.",
  },
  {
    question: "Can I update my profile information?",
    answer:
      "Yes. Open Profile to update available information such as your name, email, phone, occupation, bio and profile image. Profile information is saved through the backend.",
  },
  {
    question: "Can I customize my task settings?",
    answer:
      "Yes. Open Settings to manage available task preferences such as your default task priority and completed-task display preference. Settings are stored for your account.",
  },
];

// ==========================================
// HELP & SUPPORT
// ==========================================

const HelpSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // ==========================================
  // FAQ TOGGLE
  // ==========================================

  const handleFaqToggle = (index) => {
    setOpenFaq((previous) => (previous === index ? null : index));
  };

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
            letterSpacing: "-0.02em",
          }}
        >
          Help & Support
        </Typography>

        <Typography
          sx={{
            mt: 0.6,
            fontSize: "12px",
            color: "text.secondary",
            lineHeight: 1.5,
          }}
        >
          Find answers and learn how to use the Productivity Tracker.
        </Typography>
      </Box>

      {/* ====================================== */}
      {/* QUICK HELP CARDS */}
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
          mb: 2,
        }}
      >
        <HelpCard
          icon={<TaskAltOutlinedIcon />}
          title="Manage Tasks"
          description="Create, edit, complete and organize your daily tasks."
        />

        <HelpCard
          icon={<CalendarMonthOutlinedIcon />}
          title="Use Calendar"
          description="View your scheduled tasks by date and navigate between months."
        />

        <HelpCard
          icon={<SettingsOutlinedIcon />}
          title="Customize"
          description="Configure task preferences, display options and theme."
        />

        <HelpCard
          icon={<StorageOutlinedIcon />}
          title="Your Data"
          description="Your tasks, profile and settings are securely managed through the backend."
        />
      </Box>

      {/* ====================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1.5fr) minmax(280px, 0.5fr)",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* ==================================== */}
        {/* FAQ */}
        {/* ==================================== */}

        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
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
            {/* FAQ HEADER */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  backgroundColor: "action.hover",
                  color: "primary.main",
                }}
              >
                <HelpOutlineOutlinedIcon
                  sx={{
                    fontSize: 18,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  Frequently Asked Questions
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,
                    fontSize: "10px",
                    color: "text.secondary",
                  }}
                >
                  Common questions about the application
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                my: 2,
              }}
            />

            {/* FAQ ITEMS */}

            <Box>
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <Box
                    key={item.question}
                    sx={{
                      borderBottom:
                        index !== FAQ_ITEMS.length - 1
                          ? "1px solid"
                          : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Box
                      onClick={() => handleFaqToggle(index)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        py: 1.5,
                        cursor: "pointer",
                        userSelect: "none",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.question}
                      </Typography>

                      <ExpandMoreOutlinedIcon
                        sx={{
                          flexShrink: 0,
                          fontSize: 20,
                          transition: "transform 0.2s ease",
                          transform: isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </Box>

                    <Collapse in={isOpen}>
                      <Typography
                        sx={{
                          pb: 1.75,
                          pr: 4,
                          fontSize: "11px",
                          color: "text.secondary",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </Collapse>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>

        {/* ==================================== */}
        {/* SUPPORT SIDEBAR */}
        {/* ==================================== */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* CONTACT SUPPORT */}

          <Card
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,
              boxShadow: "none",
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
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ContactSupportOutlinedIcon
                  sx={{
                    fontSize: 19,
                    color: "primary.main",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  Need Help?
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: "11px",
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                If you encounter a problem or have a suggestion, dedicated
                support functionality can be added in a future version.
              </Typography>

              <Chip
                label="Support coming soon"
                size="small"
                variant="outlined"
                color="primary"
                sx={{
                  mt: 1.5,
                  height: 25,
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>

          {/* ABOUT */}

          <Card
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,
              boxShadow: "none",
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
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <InfoOutlinedIcon
                  sx={{
                    fontSize: 19,
                    color: "primary.main",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  About
                </Typography>
              </Box>

              <Divider
                sx={{
                  my: 1.5,
                }}
              />

              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Productivity Tracker
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "10px",
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                A personal productivity application for planning tasks,
                tracking progress and building consistent daily habits.
              </Typography>

              <Typography
                sx={{
                  mt: 1.25,
                  fontSize: "10px",
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                The application uses a React frontend with Material UI and a
                Spring Boot backend with JWT authentication and MySQL
                persistence.
              </Typography>

              <Chip
                label="Full Stack Application"
                size="small"
                sx={{
                  mt: 1.5,
                  height: 24,
                  fontSize: "9px",
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>

          {/* CURRENT FEATURES */}

          <Card
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,
              boxShadow: "none",
              backgroundColor: "action.hover",
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
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                ✓ Current Features
              </Typography>

              <Typography
                component="div"
                sx={{
                  mt: 0.75,
                  fontSize: "10px",
                  color: "text.secondary",
                  lineHeight: 1.7,
                }}
              >
                • JWT authentication
                <br />
                • Backend task persistence
                <br />
                • Dashboard and task analytics
                <br />
                • Calendar-based task viewing
                <br />
                • Profile management
                <br />
                • User settings
                <br />
                • Protected API access
              </Typography>
            </CardContent>
          </Card>

          {/* FUTURE UPDATES */}

          <Card
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,
              boxShadow: "none",
              backgroundColor: "action.hover",
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
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                🚀 Future Updates
              </Typography>

              <Typography
                sx={{
                  mt: 0.75,
                  fontSize: "10px",
                  color: "text.secondary",
                  lineHeight: 1.7,
                }}
              >
                Future versions can include password management, account
                management, advanced productivity reports, notifications,
                improved support functionality and production cloud
                deployment.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

// ==========================================
// QUICK HELP CARD
// ==========================================

const HelpCard = ({ icon, title, description }) => {
  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        boxShadow: "none",
        transition:
          "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "primary.main",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2,
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
          }}
        >
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
              "& svg": {
                fontSize: 18,
              },
            }}
          >
            {icon}
          </Box>

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: "10px",
                color: "text.secondary",
                lineHeight: 1.5,
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HelpSupport;