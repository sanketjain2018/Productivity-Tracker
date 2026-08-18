import { Box, Typography } from "@mui/material";

const AppLogo = ({
  compact = false,
  showText = true,
  size = "medium",
}) => {
  const sizes = {
    small: {
      logo: 34,
      text: 13,
      subText: 8,
      mark: 18,
    },

    medium: {
      logo: 42,
      text: 15,
      subText: 9,
      mark: 22,
    },

    large: {
      logo: 64,
      text: 24,
      subText: 11,
      mark: 34,
    },
  };

  const current = sizes[size] ?? sizes.medium;

  return (
    <Box
      sx={{
        display: "flex",

        alignItems: "center",

        gap: compact ? 0 : 1.2,

        minWidth: 0,

        userSelect: "none",
      }}
    >
      {/* ====================================== */}
      {/* LOGO MARK */}
      {/* ====================================== */}

      <Box
        sx={{
          position: "relative",

          width: current.logo,

          height: current.logo,

          flexShrink: 0,

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          borderRadius: "28%",

          background:
            "linear-gradient(135deg, #6366F1 0%, #8B5CF6 45%, #06B6D4 100%)",

          boxShadow:
            "0 0 18px rgba(99, 102, 241, 0.35)",

          overflow: "hidden",

          animation:
            "logoPulse 3s ease-in-out infinite",

          "@keyframes logoPulse": {
            "0%, 100%": {
              transform: "scale(1)",
              boxShadow:
                "0 0 14px rgba(99, 102, 241, 0.25)",
            },

            "50%": {
              transform: "scale(1.035)",
              boxShadow:
                "0 0 24px rgba(99, 102, 241, 0.45)",
            },
          },

          "&:hover": {
            animation: "logoHover 0.5s ease forwards",
          },

          "@keyframes logoHover": {
            from: {
              transform: "scale(1)",
            },

            to: {
              transform:
                "scale(1.08) rotate(-2deg)",
            },
          },

          "&::before": {
            content: '""',

            position: "absolute",

            inset: 2,

            borderRadius: "25%",

            backgroundColor:
              "rgba(15, 23, 42, 0.92)",
          },
        }}
      >
        {/* ==================================== */}
        {/* SJ MARK */}
        {/* ==================================== */}

        <Typography
          component="span"
          sx={{
            position: "relative",

            zIndex: 1,

            fontSize: current.mark,

            fontWeight: 900,

            lineHeight: 1,

            fontStyle: "italic",

            letterSpacing: "-0.08em",

            background:
              "linear-gradient(135deg, #8B5CF6, #EC4899, #06B6D4)",

            backgroundClip: "text",

            WebkitBackgroundClip:
              "text",

            WebkitTextFillColor:
              "transparent",
          }}
        >
          SJ
        </Typography>

        {/* ==================================== */}
        {/* CHECKMARK */}
        {/* ==================================== */}

        <Box
          sx={{
            position: "absolute",

            zIndex: 2,

            width:
              current.logo * 0.42,

            height:
              current.logo * 0.20,

            right:
              current.logo * 0.07,

            top:
              current.logo * 0.43,

            borderLeft:
              "3px solid #06B6D4",

            borderBottom:
              "3px solid #06B6D4",

            transform:
              "rotate(-45deg)",

            filter:
              "drop-shadow(0 0 4px rgba(6, 182, 212, 0.7))",

            animation:
              "checkAppear 2.5s ease-in-out infinite",

            "@keyframes checkAppear": {
              "0%, 15%": {
                opacity: 0,

                transform:
                  "rotate(-45deg) scale(0.5)",
              },

              "30%, 80%": {
                opacity: 1,

                transform:
                  "rotate(-45deg) scale(1)",
              },

              "95%, 100%": {
                opacity: 0,

                transform:
                  "rotate(-45deg) scale(0.5)",
              },
            },
          }}
        />

        {/* ==================================== */}
        {/* ANIMATED ORBIT */}
        {/* ==================================== */}

        <Box
          sx={{
            position: "absolute",

            width:
              current.logo * 0.82,

            height:
              current.logo * 0.82,

            borderRadius: "50%",

            border:
              "1px solid rgba(6, 182, 212, 0.35)",

            borderTopColor:
              "#06B6D4",

            borderRightColor:
              "#8B5CF6",

            animation:
              "logoOrbit 4s linear infinite",

            "@keyframes logoOrbit": {
              from: {
                transform:
                  "rotate(0deg)",
              },

              to: {
                transform:
                  "rotate(360deg)",
              },
            },
          }}
        />
      </Box>

      {/* ====================================== */}
      {/* BRAND TEXT */}
      {/* ====================================== */}

      {showText && !compact && (
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize:
                current.text,

              fontWeight: 800,

              lineHeight: 1.1,

              letterSpacing:
                "0.02em",

              color:
                "text.primary",

              whiteSpace:
                "nowrap",
            }}
          >
            PRODUCTIVITY
          </Typography>

          <Typography
            sx={{
              mt: 0.3,

              fontSize:
                current.subText,

              fontWeight: 700,

              lineHeight: 1,

              letterSpacing:
                "0.22em",

              color:
                "primary.main",

              whiteSpace:
                "nowrap",
            }}
          >
            TRACKER
          </Typography>

          <Typography
            sx={{
              mt: 0.25,

              fontSize: "7px",

              lineHeight: 1,

              letterSpacing:
                "0.16em",

              color:
                "text.secondary",

              whiteSpace:
                "nowrap",
            }}
          >
            PERSONAL WORKSPACE
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AppLogo;