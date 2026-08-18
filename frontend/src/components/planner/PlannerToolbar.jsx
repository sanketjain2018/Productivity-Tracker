import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

// ==========================================
// CATEGORY OPTIONS
// ==========================================

const categoryOptions = [
  {
    value: "All",
    label: "All categories",
    icon: "◉",
  },
  {
    value: "Learning",
    label: "Learning",
    icon: "📚",
  },
  {
    value: "Coding",
    label: "Coding",
    icon: "💻",
  },
  {
    value: "Project",
    label: "Project",
    icon: "🛠️",
  },
  {
    value: "Career",
    label: "Career",
    icon: "🎯",
  },
  {
    value: "Personal",
    label: "Personal",
    icon: "👤",
  },
  {
    value: "Health",
    label: "Health",
    icon: "🏃",
  },
  {
    value: "Break",
    label: "Break",
    icon: "☕",
  },
  {
    value: "Work",
    label: "Work",
    icon: "💼",
  },
];

// ==========================================
// PRIORITY OPTIONS
// ==========================================

const priorityOptions = [
  {
    value: "All",
    label: "All priorities",
  },
  {
    value: "High",
    label: "High",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Low",
    label: "Low",
  },
];

// ==========================================
// SORT OPTIONS
// ==========================================

const sortOptions = [
  {
    value: "None",
    label: "Default order",
  },
  {
    value: "Priority",
    label: "Priority",
  },
  {
    value: "Title",
    label: "Title",
  },
  {
    value: "Category",
    label: "Category",
  },
  {
    value: "Newest",
    label: "Newest",
  },
  {
    value: "Time",
    label: "Time",
  },
];

// ==========================================
// FILTER SELECT
// ==========================================

const FilterSelect = ({
  value,
  onChange,
  label,
  options,
}) => {
  return (
    <FormControl
      size="small"
      sx={{
        minWidth: {
          xs: "100%",
          sm: 150,
        },

        flex: {
          xs: "1 1 100%",
          sm: "1 1 0",
        },

        maxWidth: {
          sm: 220,
        },
      }}
    >
      <Select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        displayEmpty
        IconComponent={
          KeyboardArrowDownRoundedIcon
        }
        renderValue={(selectedValue) => {
          const selectedOption =
            options.find(
              (option) =>
                option.value ===
                selectedValue
            );

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                {label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "10.5px",
                  fontWeight: 700,
                  color: "text.primary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedOption?.label ??
                  selectedValue}
              </Typography>
            </Box>
          );
        }}
        sx={{
          height: 40,

          borderRadius: 1.25,

          backgroundColor:
            "background.paper",

          "& .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "divider",
            },

          "&:hover .MuiOutlinedInput-notchedOutline":
            {
              borderColor:
                "text.secondary",
            },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor:
                "primary.main",
            },

          "& .MuiSelect-icon": {
            fontSize: 18,
            color: "text.secondary",
            right: 8,
          },

          "& .MuiSelect-select": {
            py: 0.9,
            px: 1.25,
            pr: 4,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 0.5,

              borderRadius: 1.5,

              border: "1px solid",

              borderColor: "divider",

              boxShadow:
                "0 12px 35px rgba(15, 23, 42, 0.12)",

              "& .MuiMenuItem-root":
                {
                  minHeight: 38,

                  borderRadius: 0.75,

                  mx: 0.5,

                  my: 0.25,

                  fontSize: "11px",

                  "&:hover": {
                    backgroundColor:
                      "action.hover",
                  },

                  "&.Mui-selected": {
                    backgroundColor:
                      "rgba(59, 130, 246, 0.08)",
                  },

                  "&.Mui-selected:hover":
                    {
                      backgroundColor:
                        "rgba(59, 130, 246, 0.12)",
                    },
                },
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                width: "100%",
              }}
            >
              {option.icon && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  {option.icon}
                </Typography>
              )}

              <Typography
                sx={{
                  fontSize: "11px",

                  fontWeight:
                    option.value === value
                      ? 700
                      : 500,

                  color:
                    option.value === value
                      ? "primary.main"
                      : "text.primary",
                }}
              >
                {option.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// ==========================================
// PLANNER TOOLBAR
// ==========================================

const PlannerToolbar = ({
  totalTasks,
  onAddTask,
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
}) => {
  // ========================================
  // SAFE DEFAULT VALUES
  // ========================================

  const currentCategory =
    categoryFilter ?? "All";

  const currentPriority =
    priorityFilter ?? "All";

  const currentSort =
    sortBy ?? "None";

  const currentSearch =
    searchTerm ?? "";

  // ========================================
  // ACTIVE FILTERS
  // ========================================

  const hasSearch =
    currentSearch.trim().length > 0;

  const hasCategoryFilter =
    currentCategory !== "All";

  const hasPriorityFilter =
    currentPriority !== "All";

  const hasSort =
    currentSort !== "None";

  const activeFilterCount = [
    hasSearch,
    hasCategoryFilter,
    hasPriorityFilter,
    hasSort,
  ].filter(Boolean).length;

  const hasFilters =
    activeFilterCount > 0;

  // ========================================
  // CLEAR FILTERS
  // ========================================

  const handleClearFilters = () => {
    onSearchChange("");
    onCategoryChange("All");
    onPriorityChange("All");
    onSortChange("None");
  };

  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      {/* ====================================== */}
      {/* MAIN TOOLBAR CARD */}
      {/* ====================================== */}

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          backgroundColor:
            "background.paper",
          overflow: "hidden",
          boxShadow:
            "0 1px 2px rgba(15, 23, 42, 0.03)",
        }}
      >
        {/* ==================================== */}
        {/* SEARCH + NEW TASK */}
        {/* ==================================== */}

        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 2,
            },

            display: "flex",

            alignItems: {
              xs: "stretch",
              sm: "center",
            },

            gap: 1,

            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          {/* SEARCH */}
          <Box
            sx={{
              flexGrow: 1,
              position: "relative",
              minWidth: 0,
            }}
          >
            <SearchOutlinedIcon
              sx={{
                position: "absolute",

                left: 13,

                top: "50%",

                transform:
                  "translateY(-50%)",

                fontSize: 18,

                color:
                  "text.secondary",

                zIndex: 1,
              }}
            />

            <TextField
              fullWidth
              hiddenLabel
              size="small"
              placeholder="Search your tasks..."
              value={currentSearch}
              onChange={(event) =>
                onSearchChange(
                  event.target.value
                )
              }
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    minHeight: 42,

                    borderRadius:
                      1.25,

                    backgroundColor:
                      "action.hover",

                    fontSize: "11.5px",

                    pl: 4,

                    pr: 1,

                    "& fieldset": {
                      borderColor:
                        "transparent",
                    },

                    "&:hover fieldset":
                      {
                        borderColor:
                          "divider",
                      },

                    "&.Mui-focused":
                      {
                        backgroundColor:
                          "background.paper",
                      },

                    "&.Mui-focused fieldset":
                      {
                        borderColor:
                          "primary.main",
                      },
                  },

                "& input::placeholder":
                  {
                    color:
                      "text.secondary",

                    opacity: 0.9,
                  },
              }}
            />
          </Box>

          {/* TASK COUNT */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              alignItems:
                "center",

              justifyContent:
                "center",

              gap: 0.75,

              px: 1.25,

              height: 34,

              borderRadius: 1,

              backgroundColor:
                "action.hover",

              flexShrink: 0,
            }}
          >
            <FormatListBulletedRoundedIcon
              sx={{
                fontSize: 14,

                color:
                  "text.secondary",
              }}
            />

            <Typography
              sx={{
                fontSize: "10px",

                fontWeight: 600,

                color:
                  "text.secondary",

                whiteSpace:
                  "nowrap",
              }}
            >
              {totalTasks}{" "}
              {totalTasks === 1
                ? "task"
                : "tasks"}
            </Typography>
          </Box>

          {/* NEW TASK */}

          <Button
            variant="contained"
            onClick={onAddTask}
            startIcon={
              <AddTaskOutlinedIcon
                sx={{
                  fontSize:
                    "17px !important",
                }}
              />
            }
            sx={{
              minHeight: 42,

              px: 2,

              borderRadius: 1.25,

              flexShrink: 0,

              fontSize: "11px",

              fontWeight: 700,

              textTransform:
                "none",

              boxShadow: "none",

              whiteSpace:
                "nowrap",

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            New Task
          </Button>
        </Box>

        {/* ==================================== */}
        {/* FILTER SECTION */}
        {/* ==================================== */}

        <Box
          sx={{
            px: {
              xs: 1.5,
              sm: 2,
            },

            py: 1.25,

            borderTop:
              "1px solid",

            borderColor:
              "divider",

            backgroundColor:
              "rgba(148, 163, 184, 0.025)",
          }}
        >
          {/* FILTER HEADER */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 0.65,

              mb: 1,
            }}
          >
            <TuneOutlinedIcon
              sx={{
                fontSize: 14,

                color:
                  "text.secondary",
              }}
            />

            <Typography
              sx={{
                fontSize: "9px",

                fontWeight: 700,

                color:
                  "text.secondary",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.07em",
              }}
            >
              Filters & Sorting
            </Typography>

            {/* ACTIVE FILTER COUNT */}

            {activeFilterCount >
              0 && (
              <Chip
                label={
                  activeFilterCount
                }
                size="small"
                sx={{
                  height: 18,

                  minWidth: 18,

                  borderRadius: 0.75,

                  fontSize: "9px",

                  fontWeight: 700,

                  color:
                    "primary.main",

                  backgroundColor:
                    "rgba(59, 130, 246, 0.08)",

                  "& .MuiChip-label":
                    {
                      px: 0.65,
                    },
                }}
              />
            )}

            {/* CLEAR */}

            {hasFilters && (
              <Button
                size="small"
                onClick={
                  handleClearFilters
                }
                startIcon={
                  <CloseRoundedIcon
                    sx={{
                      fontSize:
                        "13px !important",
                    }}
                  />
                }
                sx={{
                  ml: "auto",

                  minHeight: 25,

                  px: 0.75,

                  borderRadius: 0.75,

                  fontSize: "9px",

                  fontWeight: 600,

                  color:
                    "text.secondary",

                  textTransform:
                    "none",

                  "&:hover": {
                    color:
                      "error.main",

                    backgroundColor:
                      "rgba(239, 68, 68, 0.05)",
                  },
                }}
              >
                Clear
              </Button>
            )}
          </Box>

          {/* ================================== */}
          {/* FILTER CONTROLS */}
          {/* ================================== */}

          <Box
            sx={{
              display: "flex",

              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },

              gap: 1,

              width: "100%",
            }}
          >
            {/* CATEGORY */}

            <FilterSelect
              label="Category"
              value={currentCategory}
              onChange={
                onCategoryChange
              }
              options={
                categoryOptions
              }
            />

            {/* PRIORITY */}

            <FilterSelect
              label="Priority"
              value={currentPriority}
              onChange={
                onPriorityChange
              }
              options={
                priorityOptions
              }
            />

            {/* SORT */}

            <FilterSelect
              label="Sort"
              value={currentSort}
              onChange={onSortChange}
              options={sortOptions}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlannerToolbar;