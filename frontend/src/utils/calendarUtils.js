// ==========================================
// MONTH NAMES
// ==========================================

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ==========================================
// WEEK DAY NAMES
// ==========================================

export const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

// ==========================================
// DAYS IN MONTH
// ==========================================

export const getDaysInMonth = (
  year,
  month
) => {
  return new Date(
    year,
    month + 1,
    0
  ).getDate();
};

// ==========================================
// FIRST DAY OF MONTH
// ==========================================

export const getFirstDayOfMonth = (
  year,
  month
) => {
  return new Date(
    year,
    month,
    1
  ).getDay();
};

// ==========================================
// TODAY CHECK
// ==========================================

export const isToday = (
  year,
  month,
  day
) => {
  const today = new Date();

  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
};

// ==========================================
// FORMAT MONTH + YEAR
// ==========================================

export const getMonthYear = (
  year,
  month
) => {
  return `${MONTHS[month]} ${year}`;
};

// ==========================================
// GENERATE CALENDAR GRID
// ==========================================

export const generateCalendarDays = (
  year,
  month
) => {
  const days = [];

  const firstDay =
    getFirstDayOfMonth(
      year,
      month
    );

  const totalDays =
    getDaysInMonth(
      year,
      month
    );

  // Previous month's empty slots
  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    days.push(null);
  }

  // Current month's days
  for (
    let day = 1;
    day <= totalDays;
    day++
  ) {
    days.push(day);
  }

  return days;
};