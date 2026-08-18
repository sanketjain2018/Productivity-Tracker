import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { NavLink } from "react-router-dom";

// ==========================================
// SIDEBAR ITEM
// ==========================================

const SidebarItem = ({
  item,
  onClick,
}) => {
  const Icon = item.icon;

  return (
    <ListItemButton
      component={NavLink}
      to={item.path}
      onClick={onClick}
      sx={{
        position: "relative",

        minHeight: 40,

        px: 1.25,

        py: 0.75,

        borderRadius: 1,

        color: "text.secondary",

        transition:
          "background-color 0.2s ease, color 0.2s ease",

        // ======================================
        // HOVER
        // ======================================

        "&:hover": {
          backgroundColor:
            "action.hover",

          color: "text.primary",
        },

        // ======================================
        // ACTIVE ROUTE
        // ======================================

        "&.active": {
          backgroundColor:
            "rgba(79, 70, 229, 0.08)",

          color:
            "primary.main",

          fontWeight: 600,
        },

        // ======================================
        // ACTIVE INDICATOR
        // ======================================

        "&.active::before": {
          content: '""',

          position: "absolute",

          left: 0,

          top: "50%",

          transform:
            "translateY(-50%)",

          width: 3,

          height: 20,

          borderRadius:
            "0 3px 3px 0",

          backgroundColor:
            "primary.main",
        },

        // ======================================
        // FOCUS
        // ======================================

        "&.Mui-focusVisible": {
          outline:
            "2px solid",

          outlineColor:
            "primary.main",

          outlineOffset: -2,
        },
      }}
    >
      {/* ====================================== */}
      {/* ICON */}
      {/* ====================================== */}

      <ListItemIcon
        sx={{
          minWidth: 36,

          color: "inherit",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          transition:
            "color 0.2s ease",
        }}
      >
        {Icon && (
          <Icon
            sx={{
              fontSize: 19,
            }}
          />
        )}
      </ListItemIcon>

      {/* ====================================== */}
      {/* LABEL */}
      {/* ====================================== */}

      <ListItemText
        primary={item.title}
        primaryTypographyProps={{
          fontSize: "13px",

          fontWeight: 500,

          lineHeight: 1.4,

          noWrap: true,
        }}
      />
    </ListItemButton>
  );
};

export default SidebarItem;