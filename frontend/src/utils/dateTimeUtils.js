export const getGreeting = (
  date = new Date()
) => {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return {
      message: "Good Morning",
      icon: "🌅",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      message: "Good Afternoon",
      icon: "☀️",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      message: "Good Evening",
      icon: "🌆",
    };
  }

  return {
    message: "Good Night",
    icon: "🌙",
  };
};

export const getFormattedDate = (
  date = new Date()
) => {
  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
};