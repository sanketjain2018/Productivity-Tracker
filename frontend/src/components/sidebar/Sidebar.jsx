import { useState } from "react";

import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { useNavigate } from "react-router-dom";

import AppLogo from "../common/AppLogo";
import DeveloperProfileDialog from "../common/DeveloperProfileDialog";

import menuItems from "../../constants/menuItems";
import SidebarItem from "./SidebarItem";

// ==========================================
// SIDEBAR
// ==========================================

const Sidebar = ({
  mobileOpen,
  onClose,
  drawerWidth,
}) => {
  const navigate = useNavigate();

  // ==========================================
  // DEVELOPER PROFILE DIALOG STATE
  // ==========================================

  const [
    developerProfileOpen,
    setDeveloperProfileOpen,
  ] = useState(false);

  // ==========================================
  // MAIN NAVIGATION
  // ==========================================

  const mainItems = menuItems.filter(
    (item) =>
      item.id >= 1 &&
      item.id <= 4
  );

  // ==========================================
  // ACCOUNT NAVIGATION
  // ==========================================

  const accountItems = menuItems.filter(
    (item) =>
      item.id === 5 ||
      item.id === 6
  );

  // ==========================================
  // HELP & SUPPORT NAVIGATION
  // ==========================================

  const handleHelpSupport = () => {
    navigate("/help-support");

    // Close mobile drawer
    onClose();
  };

  // ==========================================
  // OPEN DEVELOPER PROFILE
  // ==========================================

  const handleDeveloperProfile = () => {
    setDeveloperProfileOpen(true);

    // Close mobile drawer if open
    onClose();
  };

  // ==========================================
  // CLOSE DEVELOPER PROFILE
  // ==========================================

  const handleDeveloperProfileClose = () => {
    setDeveloperProfileOpen(false);
  };

  // ==========================================
  // SIDEBAR CONTENT
  // ==========================================

  const drawerContent = (
    <Box
      sx={{
        height: "100%",

        display: "flex",

        flexDirection: "column",

        backgroundColor:
          "background.paper",

        color: "text.primary",
      }}
    >
      {/* ====================================== */}
      {/* BRAND */}
      {/* ====================================== */}

      <Toolbar
        sx={{
          minHeight:
            "64px !important",

          px: 2.5,

          display: "flex",

          alignItems: "center",
        }}
      >
        <AppLogo
          size="small"
          showText
        />
      </Toolbar>

      <Divider />

      {/* ====================================== */}
      {/* MAIN NAVIGATION */}
      {/* ====================================== */}

      <Box
        sx={{
          flexGrow: 1,

          overflowY: "auto",

          overflowX: "hidden",

          px: 1.5,

          py: 2,
        }}
      >
        <Typography
          sx={{
            px: 1.25,

            mb: 1,

            fontSize: "10px",

            fontWeight: 600,

            fontFamily:
              '"JetBrains Mono", monospace',

            color:
              "text.secondary",

            letterSpacing:
              "0.08em",

            textTransform:
              "uppercase",
          }}
        >
          Workspace
        </Typography>

        <List
          disablePadding
          sx={{
            display: "flex",

            flexDirection:
              "column",

            gap: 0.5,
          }}
        >
          {mainItems.map(
            (item) => (
              <SidebarItem
                key={item.id}
                item={item}
                onClick={onClose}
              />
            )
          )}
        </List>
      </Box>

      {/* ====================================== */}
      {/* ACCOUNT SECTION */}
      {/* ====================================== */}

      <Box
        sx={{
          px: 1.5,

          pb: 1.5,
        }}
      >
        <Divider
          sx={{
            mb: 1.5,
          }}
        />

        <Typography
          sx={{
            px: 1.25,

            mb: 1,

            fontSize: "10px",

            fontWeight: 600,

            fontFamily:
              '"JetBrains Mono", monospace',

            color:
              "text.secondary",

            letterSpacing:
              "0.08em",

            textTransform:
              "uppercase",
          }}
        >
          Account
        </Typography>

        <List
          disablePadding
          sx={{
            display: "flex",

            flexDirection:
              "column",

            gap: 0.5,
          }}
        >
          {accountItems.map(
            (item) => (
              <SidebarItem
                key={item.id}
                item={item}
                onClick={onClose}
              />
            )
          )}
        </List>

        {/* ==================================== */}
        {/* HELP & SUPPORT */}
        {/* ==================================== */}

        <Box
          onClick={handleHelpSupport}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key ===
                "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              handleHelpSupport();
            }
          }}
          sx={{
            mt: 1,

            px: 1.25,

            py: 1,

            display: "flex",

            alignItems: "center",

            gap: 1,

            borderRadius: 1,

            color:
              "text.secondary",

            cursor: "pointer",

            transition:
              "background-color 0.2s ease, color 0.2s ease",

            "&:hover": {
              backgroundColor:
                "action.hover",

              color:
                "text.primary",
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
          <HelpOutlineOutlinedIcon
            sx={{
              fontSize: 18,

              flexShrink: 0,
            }}
          />

          <Typography
            sx={{
              fontSize: "12px",

              fontWeight: 500,
            }}
          >
            Help & Support
          </Typography>
        </Box>

        {/* ==================================== */}
        {/* DEVELOPER PROFILE */}
        {/* ==================================== */}

        <Box
          onClick={
            handleDeveloperProfile
          }
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key ===
                "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              handleDeveloperProfile();
            }
          }}
          sx={{
            mt: 2,

            pt: 1.5,

            borderTop:
              "1px solid",

            borderColor:
              "divider",

            textAlign:
              "center",

            cursor: "pointer",

            borderRadius: 1.5,

            transition:
              "background-color 0.2s ease, transform 0.2s ease",

            "&:hover": {
              backgroundColor:
                "action.hover",

              transform:
                "translateY(-1px)",
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
          <Typography
            sx={{
              fontSize: "9px",

              color:
                "text.secondary",

              lineHeight: 1.5,
            }}
          >
            Built by
          </Typography>

          <Typography
            sx={{
              mt: 0.2,

              fontSize: "11px",

              fontWeight: 700,

              color:
                "text.primary",

              letterSpacing:
                "0.01em",
            }}
          >
            Sanket Jain
          </Typography>

          <Typography
            sx={{
              mt: 0.2,

              fontSize: "8px",

              color:
                "text.secondary",

              fontFamily:
                '"JetBrains Mono", monospace',

              letterSpacing:
                "0.05em",
            }}
          >
            JAVA FULL STACK DEVELOPER
          </Typography>
        </Box>
      </Box>

      {/* ====================================== */}
      {/* DEVELOPER PROFILE DIALOG */}
      {/* ====================================== */}

      <DeveloperProfileDialog
        open={
          developerProfileOpen
        }
        onClose={
          handleDeveloperProfileClose
        }
      />
    </Box>
  );

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <>
      {/* ====================================== */}
      {/* MOBILE DRAWER */}
      {/* ====================================== */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,

            boxSizing:
              "border-box",

            border: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* ====================================== */}
      {/* DESKTOP DRAWER */}
      {/* ====================================== */}

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: drawerWidth,

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,

            boxSizing:
              "border-box",

            borderRight:
              "1px solid",

            borderColor:
              "divider",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;