import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { createAppTheme } from "../theme/theme";

// ==========================================
// CREATE CONTEXT
// ==========================================

const ThemeContext = createContext(null);

// ==========================================
// PROVIDER
// ==========================================

export const ThemeProvider = ({
  children,
}) => {
  // ========================================
  // THEME MODE
  // ========================================

  const [mode, setMode] = useState(() => {
    const savedMode =
      localStorage.getItem(
        "productivity_theme"
      );

    return savedMode === "dark"
      ? "dark"
      : "light";
  });

  // ========================================
  // TOGGLE THEME
  // ========================================

  const toggleTheme = () => {
    setMode((previousMode) => {
      const newMode =
        previousMode === "light"
          ? "dark"
          : "light";

      localStorage.setItem(
        "productivity_theme",
        newMode
      );

      return newMode;
    });
  };

  // ========================================
  // CREATE MUI THEME
  // ========================================

  const theme = useMemo(
    () => createAppTheme(mode),
    [mode]
  );

  // ========================================
  // CONTEXT VALUE
  // ========================================

  const value = {
    mode,

    isDarkMode:
      mode === "dark",

    toggleTheme,
  };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <ThemeContext.Provider
      value={value}
    >
      <MuiThemeProvider
        theme={theme}
      >
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const useThemeContext = () => {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used inside ThemeProvider"
    );
  }

  return context;
};