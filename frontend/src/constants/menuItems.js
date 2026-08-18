import DashboardIcon from "@mui/icons-material/Dashboard";
import TodayIcon from "@mui/icons-material/Today";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: "Planner",
    path: "/planner",
    icon: TodayIcon,
  },
  {
    id: 3,
    title: "Analytics",
    path: "/analytics",
    icon: BarChartIcon,
  },
  {
    id: 4,
    title: "Calendar",
    path: "/calendar",
    icon: CalendarMonthIcon,
  },
  {
    id: 5,
    title: "Profile",
    path: "/profile",
    icon: PersonIcon,
  },
  {
    id: 6,
    title: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
{
  id: 7,
  title: "Help & Support",
  path: "/help-support",
  icon: HelpOutlineIcon,
},
];

export default menuItems;