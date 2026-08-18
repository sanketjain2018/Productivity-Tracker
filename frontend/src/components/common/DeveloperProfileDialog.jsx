import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import AppLogo from "./AppLogo";

// ==========================================
// DEVELOPER PROFILE LINKS
// ==========================================

const GITHUB_URL =
  "https://github.com/sanketjain2018";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/sanket-java-full-stack/";

// ==========================================
// DEVELOPER PROFILE DIALOG
// ==========================================

const DeveloperProfileDialog = ({
  open,
  onClose,
}) => {
  // ==========================================
  // TECHNOLOGIES
  // ==========================================

  const technologies = [
    "Java",
    "Spring Boot",
    "Spring Security",
    "React.js",
    "JavaScript",
    "Material UI",
    "MySQL",
    "REST API",
    "Git",
    "GitHub",
  ];

  // ==========================================
  // OPEN EXTERNAL PROFILE
  // ==========================================

  const handleExternalLink = (url) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,

          overflow: "hidden",

          border: "1px solid",

          borderColor:
            "divider",

          boxShadow:
            "0 24px 80px rgba(15, 23, 42, 0.18)",
        },
      }}
    >
      {/* ====================================== */}
      {/* TOP GRADIENT */}
      {/* ====================================== */}

      <Box
        sx={{
          height: 5,

          background:
            "linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899, #06B6D4)",
        }}
      />

      {/* ====================================== */}
      {/* CLOSE BUTTON */}
      {/* ====================================== */}

      <IconButton
        onClick={onClose}
        aria-label="Close developer profile"
        sx={{
          position: "absolute",

          top: 12,

          right: 12,

          zIndex: 2,

          width: 32,

          height: 32,

          backgroundColor:
            "action.hover",

          "&:hover": {
            backgroundColor:
              "action.selected",
          },
        }}
      >
        <CloseRoundedIcon
          sx={{
            fontSize: 18,
          }}
        />
      </IconButton>

      <DialogContent
        sx={{
          p: {
            xs: 2.5,
            sm: 3.5,
          },
        }}
      >
        {/* ==================================== */}
        {/* PROFILE HEADER */}
        {/* ==================================== */}

        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            alignItems: {
              xs: "center",
              sm: "flex-start",
            },

            gap: 2.5,

            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          {/* LOGO */}

          <AppLogo
            size="medium"
            compact
            showText={false}
          />

          {/* NAME */}

          <Box
            sx={{
              flex: 1,

              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "21px",
                  sm: "24px",
                },

                fontWeight: 800,

                lineHeight: 1.2,

                color:
                  "text.primary",
              }}
            >
              Sanket Jain
            </Typography>

            <Typography
              sx={{
                mt: 0.6,

                fontSize: "13px",

                fontWeight: 600,

                color:
                  "primary.main",
              }}
            >
              Java Full Stack Developer
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,

                lineHeight: 1.7,

                maxWidth: 430,
              }}
            >
              Building practical software
              with modern frontend
              experiences and scalable
              backend architecture.
            </Typography>
          </Box>
        </Box>

        {/* ==================================== */}
        {/* TECHNOLOGIES */}
        {/* ==================================== */}

        <Box
          sx={{
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1,

              mb: 1.5,
            }}
          >
            <CodeRoundedIcon
              sx={{
                fontSize: 18,

                color:
                  "primary.main",
              }}
            />

            <Typography
              sx={{
                fontSize: "12px",

                fontWeight: 700,

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.06em",

                color:
                  "text.secondary",
              }}
            >
              Technologies
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",

              flexWrap: "wrap",

              gap: 0.8,
            }}
          >
            {technologies.map(
              (technology) => (
                <Chip
                  key={technology}
                  label={technology}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 1.5,

                    fontSize: "10.5px",

                    fontWeight: 600,

                    borderColor:
                      "divider",

                    backgroundColor:
                      "action.hover",
                  }}
                />
              )
            )}
          </Box>
        </Box>

        {/* ==================================== */}
        {/* CURRENT PROJECT */}
        {/* ==================================== */}

        <Box
          sx={{
            mt: 3,

            p: 2,

            borderRadius: 2,

            backgroundColor:
              "action.hover",

            border: "1px solid",

            borderColor:
              "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1,

              mb: 1,
            }}
          >
            <WorkOutlineRoundedIcon
              sx={{
                fontSize: 18,

                color:
                  "primary.main",
              }}
            />

            <Typography
              sx={{
                fontSize: "12px",

                fontWeight: 700,

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.06em",

                color:
                  "text.secondary",
              }}
            >
              Current Project
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "16px",

              fontWeight: 700,

              color:
                "text.primary",
            }}
          >
            Productivity Tracker
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.6,

              lineHeight: 1.6,
            }}
          >
            A personal productivity
            workspace designed to plan,
            organize, track and analyze
            daily tasks.
          </Typography>

          <Box
            sx={{
              display: "flex",

              flexWrap: "wrap",

              gap: 0.7,

              mt: 1.5,
            }}
          >
            <Chip
              label="React.js"
              size="small"
              color="primary"
              variant="outlined"
            />

            <Chip
              label="Material UI"
              size="small"
              color="primary"
              variant="outlined"
            />

            <Chip
              label="LocalStorage"
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* ==================================== */}
        {/* DIVIDER */}
        {/* ==================================== */}

        <Divider
          sx={{
            my: 3,
          }}
        />

        {/* ==================================== */}
        {/* SOCIAL LINKS */}
        {/* ==================================== */}

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

            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "10px",

                color:
                  "text.secondary",
              }}
            >
              Connect with me
            </Typography>

            <Typography
              sx={{
                mt: 0.25,

                fontSize: "12px",

                fontWeight: 700,
              }}
            >
              Sanket Jain
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",

              gap: 1,

              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            {/* GITHUB */}

            <Button
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              startIcon={
                <GitHubIcon />
              }
              endIcon={
                <OpenInNewRoundedIcon
                  sx={{
                    fontSize:
                      "14px !important",
                  }}
                />
              }
              sx={{
                flex: {
                  xs: 1,
                  sm: "initial",
                },

                textTransform:
                  "none",

                borderRadius: 1.5,

                fontSize: "11px",

                fontWeight: 600,
              }}
            >
              GitHub
            </Button>

            {/* LINKEDIN */}

            <Button
              component="a"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              startIcon={
                <LinkedInIcon />
              }
              endIcon={
                <OpenInNewRoundedIcon
                  sx={{
                    fontSize:
                      "14px !important",
                  }}
                />
              }
              sx={{
                flex: {
                  xs: 1,
                  sm: "initial",
                },

                textTransform:
                  "none",

                borderRadius: 1.5,

                fontSize: "11px",

                fontWeight: 600,
              }}
            >
              LinkedIn
            </Button>
          </Box>
        </Box>

        {/* ==================================== */}
        {/* FOOTER */}
        {/* ==================================== */}

        <Typography
          align="center"
          sx={{
            mt: 2.5,

            fontSize: "9px",

            color:
              "text.secondary",

            fontFamily:
              '"JetBrains Mono", monospace',

            letterSpacing:
              "0.08em",
          }}
        >
          PRODUCTIVITY TRACKER ·
          v1.0.0 · BUILT BY SANKET JAIN
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperProfileDialog;