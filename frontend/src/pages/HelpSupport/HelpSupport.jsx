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
      'Open Planner and click "Add Task". Enter the task details, select the priority and category, then save the task.',
  },
  {
    question: "Can I create a task without an end time?",
    answer:
      'Yes. A task can have only a start time. This is useful for tasks such as "Sleep at 10 PM", where you only want to record when the activity starts.',
  },
  {
    question: "Can I edit or delete a task?",
    answer:
      "Yes. Open Planner and use the Edit or Delete action on the task card.",
  },
  {
    question: "How does task completion work?",
    answer:
      'Use the "Mark as Done" action on a task. Completed tasks contribute to your daily completion percentage and productivity statistics.',
  },
  {
    question: "How does the Calendar work?",
    answer:
      "Calendar displays tasks according to their scheduled date. Select a date to view the tasks scheduled for that day.",
  },
  {
    question: "Where is my task data stored?",
    answer:
      "At the current stage of the application, task data is stored locally in your browser using LocalStorage. A Spring Boot backend and database will be added in a future version.",
  },
  {
    question: "What happens if I clear application data?",
    answer:
      "Clearing application data removes locally stored tasks, profile information, settings and other saved application preferences. This action cannot be undone.",
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
          description="Understand how your data is currently stored and managed."
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
                        index !== FAQ_ITEMS.length - 1 ? "1px solid" : "none",

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

                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
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
                If you encounter a problem or have a suggestion, support
                functionality can be connected here in a future version.
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
                A personal productivity application for planning tasks, tracking
                progress and building consistent daily habits.
              </Typography>

              <Chip
                label="Frontend Version"
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

          {/* FUTURE BACKEND */}

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

                  lineHeight: 1.6,
                }}
              >
                Future versions can include user accounts, Spring Boot APIs,
                database storage, secure authentication, cloud synchronization
                and real support functionality.
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
