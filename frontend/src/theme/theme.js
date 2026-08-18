import { createTheme } from "@mui/material/styles";

// ==========================================
// PRODUCTIVITY DESIGN TOKENS
// ==========================================

export const DESIGN_TOKENS = {
  colors: {
    primary: "#3525CD",
    primaryAction: "#4F46E5",

    backgroundLight: "#F8FAFC",
    surfaceLight: "#FFFFFF",

    backgroundDark: "#0B1120",
    surfaceDark: "#111827",

    textLight: "#0B1C30",
    textSecondaryLight: "#464555",
    textMutedLight: "#64748B",

    textDark: "#F8FAFC",
    textSecondaryDark: "#CBD5E1",
    textMutedDark: "#94A3B8",

    borderLight: "#E2E8F0",
    borderDark: "#273449",

    success: "#10B981",
    warning: "#F59E0B",
    error: "#E11D48",

    hoverLight: "#F1F5F9",
    hoverDark: "#1E293B",
  },

  layout: {
    sidebarWidth: 240,
    mobilePadding: 16,
    desktopPadding: 32,
    gutter: 16,
    maxWidth: 1440,
  },

  radius: {
    small: 2,
    default: 4,
    medium: 6,
    large: 8,
    extraLarge: 12,
  },
};

// ==========================================
// CREATE APPLICATION THEME
// ==========================================

export const createAppTheme = (mode = "light") => {
  const isDark = mode === "dark";

  return createTheme({
    // ========================================
    // PALETTE
    // ========================================

    palette: {
      mode,

      primary: {
        main: DESIGN_TOKENS.colors.primaryAction,
        contrastText: "#FFFFFF",
      },

      secondary: {
        main: "#6366F1",
      },

      success: {
        main: DESIGN_TOKENS.colors.success,
      },

      warning: {
        main: DESIGN_TOKENS.colors.warning,
      },

      error: {
        main: DESIGN_TOKENS.colors.error,
      },

      background: {
        default: isDark
          ? DESIGN_TOKENS.colors.backgroundDark
          : DESIGN_TOKENS.colors.backgroundLight,

        paper: isDark
          ? DESIGN_TOKENS.colors.surfaceDark
          : DESIGN_TOKENS.colors.surfaceLight,
      },

      text: {
        primary: isDark
          ? DESIGN_TOKENS.colors.textDark
          : DESIGN_TOKENS.colors.textLight,

        secondary: isDark
          ? DESIGN_TOKENS.colors.textSecondaryDark
          : DESIGN_TOKENS.colors.textSecondaryLight,
      },

      divider: isDark
        ? DESIGN_TOKENS.colors.borderDark
        : DESIGN_TOKENS.colors.borderLight,
    },

    // ========================================
    // TYPOGRAPHY
    // ========================================

    typography: {
      fontFamily:
        '"Inter", "Roboto", Arial, sans-serif',

      h1: {
        fontFamily: "Inter, sans-serif",
        fontSize: "36px",
        fontWeight: 700,
        lineHeight: 1.22,
        letterSpacing: "-0.02em",
      },

      h2: {
        fontFamily: "Inter, sans-serif",
        fontSize: "30px",
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: "-0.02em",
      },

      h3: {
        fontFamily: "Inter, sans-serif",
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: 1.33,
        letterSpacing: "-0.015em",
      },

      h4: {
        fontFamily: "Inter, sans-serif",
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "-0.01em",
      },

      h5: {
        fontFamily: "Inter, sans-serif",
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: 1.33,
        letterSpacing: "-0.01em",
      },

      h6: {
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: 1.5,
      },

      body1: {
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.43,
      },

      body2: {
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        fontWeight: 400,
        lineHeight: 1.54,
      },

      caption: {
        fontFamily:
          '"JetBrains Mono", monospace',
        fontSize: "11px",
        fontWeight: 500,
        lineHeight: 1.27,
        letterSpacing: "0.03em",
      },

      button: {
        fontFamily: '"Inter", sans-serif',
        fontSize: "13px",
        fontWeight: 600,
        textTransform: "none",
      },
    },

    // ========================================
    // SHAPE
    // ========================================

    shape: {
      borderRadius: 4,
    },

    // ========================================
    // COMPONENT OVERRIDES
    // ========================================

    components: {
      // ======================================
      // BUTTON
      // ======================================

      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 32,
            borderRadius: 4,
            padding: "6px 12px",
            fontWeight: 600,
            boxShadow: "none",
            textTransform: "none",

            "&:hover": {
              boxShadow: "none",
            },
          },

          containedPrimary: {
            backgroundColor:
              DESIGN_TOKENS.colors.primaryAction,

            "&:hover": {
              backgroundColor:
                DESIGN_TOKENS.colors.primary,
            },
          },

          outlined: {
            borderColor: isDark
              ? DESIGN_TOKENS.colors.borderDark
              : DESIGN_TOKENS.colors.borderLight,

            color: isDark
              ? DESIGN_TOKENS.colors.textDark
              : DESIGN_TOKENS.colors.textLight,

            "&:hover": {
              borderColor:
                DESIGN_TOKENS.colors.primaryAction,

              backgroundColor: isDark
                ? DESIGN_TOKENS.colors.hoverDark
                : DESIGN_TOKENS.colors.hoverLight,
            },
          },
        },
      },

      // ======================================
      // ICON BUTTON
      // ======================================

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,

            "&:hover": {
              backgroundColor: isDark
                ? DESIGN_TOKENS.colors.hoverDark
                : DESIGN_TOKENS.colors.hoverLight,
            },
          },
        },
      },

      // ======================================
      // TEXT FIELD
      // ======================================

      MuiTextField: {
        defaultProps: {
          size: "small",
        },

        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,

              backgroundColor: isDark
                ? DESIGN_TOKENS.colors.surfaceDark
                : DESIGN_TOKENS.colors.surfaceLight,

              "& fieldset": {
                borderColor: isDark
                  ? DESIGN_TOKENS.colors.borderDark
                  : DESIGN_TOKENS.colors.borderLight,
              },

              "&:hover fieldset": {
                borderColor:
                  DESIGN_TOKENS.colors.primaryAction,
              },

              "&.Mui-focused fieldset": {
                borderColor:
                  DESIGN_TOKENS.colors.primaryAction,

                boxShadow:
                  "0 0 0 2px rgba(79, 70, 229, 0.10)",
              },
            },
          },
        },
      },

      // ======================================
      // OUTLINED INPUT
      // ======================================

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 4,

            "& fieldset": {
              borderColor: isDark
                ? DESIGN_TOKENS.colors.borderDark
                : DESIGN_TOKENS.colors.borderLight,
            },

            "&:hover fieldset": {
              borderColor:
                DESIGN_TOKENS.colors.primaryAction,
            },

            "&.Mui-focused fieldset": {
              borderColor:
                DESIGN_TOKENS.colors.primaryAction,
            },
          },
        },
      },

      // ======================================
      // CARD
      // ======================================

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark
              ? DESIGN_TOKENS.colors.surfaceDark
              : DESIGN_TOKENS.colors.surfaceLight,

            border: `1px solid ${
              isDark
                ? DESIGN_TOKENS.colors.borderDark
                : DESIGN_TOKENS.colors.borderLight
            }`,

            borderRadius: 6,

            boxShadow: "none",
          },
        },
      },

      // ======================================
      // PAPER
      // ======================================

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },

          elevation1: {
            boxShadow: isDark
              ? "0 4px 12px rgba(0, 0, 0, 0.25)"
              : "0 4px 12px rgba(15, 23, 42, 0.08)",
          },
        },
      },

      // ======================================
      // CHIP
      // ======================================

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 2,
            fontFamily:
              '"JetBrains Mono", monospace',
            fontSize: "11px",
            fontWeight: 500,
            height: 24,
          },
        },
      },

      // ======================================
      // DIVIDER
      // ======================================

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark
              ? DESIGN_TOKENS.colors.borderDark
              : DESIGN_TOKENS.colors.borderLight,
          },
        },
      },

      // ======================================
      // TOOLTIP
      // ======================================

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily:
              '"Inter", sans-serif',

            fontSize: "12px",

            borderRadius: 4,

            backgroundColor: isDark
              ? "#E2E8F0"
              : "#0B1C30",

            color: isDark
              ? "#0B1C30"
              : "#FFFFFF",
          },
        },
      },
    },
  });
};

// ==========================================
// DEFAULT THEME
// ==========================================
//
// Keeps compatibility with:
//
// import theme from "./theme";
//
// ==========================================

const theme = createAppTheme("light");

export default theme;