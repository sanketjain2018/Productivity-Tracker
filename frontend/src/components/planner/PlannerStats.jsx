import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SchoolIcon from "@mui/icons-material/School";
import ConstructionIcon from "@mui/icons-material/Construction";

const PlannerStats = ({ tasks }) => {
  // ==========================================
  // CALCULATE STATS
  // ==========================================

  const totalTasks = tasks.length;

  const highPriorityTasks = tasks.filter(
    (task) =>
      task.priority?.toLowerCase() === "high"
  ).length;

  const learningTasks = tasks.filter(
    (task) => task.category === "Learning"
  ).length;

  const projectTasks = tasks.filter(
    (task) => task.category === "Project"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      color: "#1976d2",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      color: "#d32f2f",
      icon: <PriorityHighIcon />,
    },
    {
      title: "Learning",
      value: learningTasks,
      color: "#7b1fa2",
      icon: <SchoolIcon />,
    },
    {
      title: "Projects",
      value: projectTasks,
      color: "#2e7d32",
      icon: <ConstructionIcon />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        },

        gap: 3,

        mb: 4,
      }}
    >
      {stats.map((stat) => (
        <Card
          key={stat.title}
          sx={{
            borderRadius: 3,

            boxShadow: 2,

            transition: "0.25s",

            height: "100%",

            "&:hover": {
              transform: "translateY(-4px)",

              boxShadow: 6,
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {stat.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {stat.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 52,

                  height: 52,

                  borderRadius: "50%",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  bgcolor: stat.color,

                  color: "#fff",
                }}
              >
                {stat.icon}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PlannerStats;