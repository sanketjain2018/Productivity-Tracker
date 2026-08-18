import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

import {
  getMonthYear,
} from "../../utils/calendarUtils";

// ==========================================
// CALENDAR TOOLBAR
// ==========================================

const CalendarToolbar = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <Box
      sx={{
        mb: 3,

        display: "flex",

        alignItems: {
          xs: "stretch",
          md: "center",
        },

        justifyContent:
          "space-between",

        gap: 2,

        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      {/* ====================================== */}
      {/* PAGE TITLE */}
      {/* ====================================== */}

      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: "20px",
              sm: "22px",
            },

            fontWeight: 700,

            lineHeight: 1.2,

            letterSpacing:
              "-0.02em",

            color:
              "text.primary",
          }}
        >
          Calendar
        </Typography>

        <Typography
          sx={{
            mt: 0.5,

            fontSize: "11px",

            color:
              "text.secondary",
          }}
        >
          View and manage your
          scheduled tasks.
        </Typography>
      </Box>

      {/* ====================================== */}
      {/* MONTH NAVIGATION */}
      {/* ====================================== */}

      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent:
            "center",

          gap: {
            xs: 0.75,
            sm: 1,
          },
        }}
      >
        {/* PREVIOUS */}

        <IconButton
          onClick={onPreviousMonth}
          aria-label="Previous month"
          size="small"
          sx={{
            width: 34,

            height: 34,

            border: "1px solid",

            borderColor:
              "divider",

            borderRadius: 1,

            color:
              "text.secondary",

            "&:hover": {
              borderColor:
                "primary.main",

              color:
                "primary.main",

              backgroundColor:
                "action.hover",
            },
          }}
        >
          <ChevronLeftOutlinedIcon
            sx={{
              fontSize: 19,
            }}
          />
        </IconButton>

        {/* MONTH / YEAR */}

        <Box
          sx={{
            minWidth: {
              xs: 150,
              sm: 180,
            },

            px: 1,

            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "14px",
                sm: "15px",
              },

              fontWeight: 700,

              lineHeight: 1.3,

              color:
                "text.primary",
            }}
          >
            {getMonthYear(
              currentYear,
              currentMonth
            )}
          </Typography>
        </Box>

        {/* NEXT */}

        <IconButton
          onClick={onNextMonth}
          aria-label="Next month"
          size="small"
          sx={{
            width: 34,

            height: 34,

            border: "1px solid",

            borderColor:
              "divider",

            borderRadius: 1,

            color:
              "text.secondary",

            "&:hover": {
              borderColor:
                "primary.main",

              color:
                "primary.main",

              backgroundColor:
                "action.hover",
            },
          }}
        >
          <ChevronRightOutlinedIcon
            sx={{
              fontSize: 19,
            }}
          />
        </IconButton>
      </Box>

      {/* ====================================== */}
      {/* TODAY */}
      {/* ====================================== */}

      <Button
        variant="outlined"
        onClick={onToday}
        startIcon={
          <TodayOutlinedIcon
            sx={{
              fontSize: 16,
            }}
          />
        }
        sx={{
          minHeight: 36,

          px: 1.75,

          borderRadius: 1,

          alignSelf: {
            xs: "stretch",
            md: "auto",
          },

          fontSize: "11px",

          fontWeight: 600,

          textTransform:
            "none",

          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        }}
      >
        Today
      </Button>
    </Box>
  );
};

export default CalendarToolbar;