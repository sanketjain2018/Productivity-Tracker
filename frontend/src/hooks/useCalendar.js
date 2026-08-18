import { useState } from "react";

const useCalendar = () => {
  // ==========================================
  // CURRENT DATE
  // ==========================================

  const today = new Date();

  // ==========================================
  // STATES
  // ==========================================

  const [currentMonth, setCurrentMonth] =
    useState(today.getMonth());

  const [currentYear, setCurrentYear] =
    useState(today.getFullYear());

  // ==========================================
  // NEXT MONTH
  // ==========================================

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((previous) => previous + 1);
    } else {
      setCurrentMonth((previous) => previous + 1);
    }
  };

  // ==========================================
  // PREVIOUS MONTH
  // ==========================================

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((previous) => previous - 1);
    } else {
      setCurrentMonth((previous) => previous - 1);
    }
  };

  // ==========================================
  // GO TO TODAY
  // ==========================================

  const goToToday = () => {
    const today = new Date();

    setCurrentMonth(today.getMonth());

    setCurrentYear(today.getFullYear());
  };

  // ==========================================
  // PUBLIC API
  // ==========================================

  return {
    currentMonth,
    currentYear,

    goToNextMonth,
    goToPreviousMonth,
    goToToday,
  };
};

export default useCalendar;