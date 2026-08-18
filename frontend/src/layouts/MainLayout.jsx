// import { useState } from "react";

// import { Box } from "@mui/material";

// import { Outlet } from "react-router-dom";

// import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "../components/navbar/Navbar";

// const DRAWER_WIDTH = 260;

// const MainLayout = () => {
//   // ==========================================
//   // MOBILE SIDEBAR STATE
//   // ==========================================

//   const [mobileOpen, setMobileOpen] =
//     useState(false);

//   // ==========================================
//   // REMOVE CURRENT FOCUS
//   // ==========================================

//   const removeCurrentFocus = () => {
//     const activeElement =
//       document.activeElement;

//     if (
//       activeElement &&
//       activeElement !== document.body &&
//       typeof activeElement.blur ===
//         "function"
//     ) {
//       activeElement.blur();
//     }
//   };

//   // ==========================================
//   // OPEN / CLOSE MOBILE SIDEBAR
//   // ==========================================

//   const handleDrawerToggle = () => {
//     // Remove focus from the hamburger
//     // button before changing Drawer state.
//     removeCurrentFocus();

//     setMobileOpen(
//       (previousState) =>
//         !previousState
//     );
//   };

//   // ==========================================
//   // CLOSE MOBILE SIDEBAR
//   // ==========================================

//   const handleDrawerClose = () => {
//     // Remove focus before closing the
//     // temporary MUI Drawer.
//     removeCurrentFocus();

//     setMobileOpen(false);
//   };

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         minHeight: "100vh",
//         backgroundColor:
//           "background.default",
//       }}
//     >
//       {/* ====================================== */}
//       {/* SIDEBAR */}
//       {/* ====================================== */}

//       <Sidebar
//         mobileOpen={mobileOpen}
//         onClose={handleDrawerClose}
//         drawerWidth={DRAWER_WIDTH}
//       />

//       {/* ====================================== */}
//       {/* RIGHT SIDE */}
//       {/* ====================================== */}

//       <Box
//         sx={{
//           flexGrow: 1,

//           width: {
//             xs: "100%",
//             md: `calc(100% - ${DRAWER_WIDTH}px)`,
//           },

//           ml: {
//             xs: 0,
//             md: `${DRAWER_WIDTH}px`,
//           },
//         }}
//       >
//         {/* ==================================== */}
//         {/* NAVBAR */}
//         {/* ==================================== */}

//         <Navbar
//           onMenuClick={
//             handleDrawerToggle
//           }
//           drawerWidth={DRAWER_WIDTH}
//         />

//         {/* ==================================== */}
//         {/* PAGE CONTENT */}
//         {/* ==================================== */}

//         <Box
//           component="main"
//           sx={{
//             minHeight: "100vh",

//             pt: {
//               xs: "90px",
//               md: "95px",
//             },

//             px: {
//               xs: 2,
//               sm: 3,
//               md: 4,
//             },

//             pb: 4,
//           }}
//         >
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default MainLayout;


import { useState } from "react";

import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const DRAWER_WIDTH = 240;

const MainLayout = () => {
  // ==========================================
  // MOBILE SIDEBAR STATE
  // ==========================================

  const [mobileOpen, setMobileOpen] =
    useState(false);

  // ==========================================
  // OPEN / CLOSE MOBILE SIDEBAR
  // ==========================================

  const handleDrawerToggle = () => {
    setMobileOpen(
      (previousState) => !previousState
    );
  };

  // ==========================================
  // CLOSE MOBILE SIDEBAR
  // ==========================================

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <Box
      sx={{
        display: "flex",

        minHeight: "100vh",

        backgroundColor:
          "background.default",

        color: "text.primary",
      }}
    >
      {/* ====================================== */}
      {/* SIDEBAR */}
      {/* ====================================== */}

      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
        drawerWidth={DRAWER_WIDTH}
      />

      {/* ====================================== */}
      {/* MAIN AREA */}
      {/* ====================================== */}

      <Box
        sx={{
          flexGrow: 1,

          width: {
            xs: "100%",
            md: `calc(100% - ${DRAWER_WIDTH}px)`,
          },

          ml: {
            xs: 0,
            md: `${DRAWER_WIDTH}px`,
          },

          minWidth: 0,
        }}
      >
        {/* ==================================== */}
        {/* NAVBAR */}
        {/* ==================================== */}

        <Navbar
          onMenuClick={handleDrawerToggle}
          drawerWidth={DRAWER_WIDTH}
        />

        {/* ==================================== */}
        {/* PAGE CONTENT */}
        {/* ==================================== */}

        <Box
          component="main"
          sx={{
            minHeight: "100vh",

            pt: {
              xs: "72px",
              md: "72px",
            },

            px: {
              xs: 2,
              sm: 2,
              md: 4,
            },

            pb: 4,

            width: "100%",

            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              width: "100%",

              maxWidth: "1440px",

              mx: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;