import { useEffect, useState } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] =
    useState(() => new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    // Update once per minute
    const intervalId = setInterval(
      updateCurrentTime,
      60 * 1000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return currentTime;
};

export default useCurrentTime;