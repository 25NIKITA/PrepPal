// hooks/useTimer.ts
import { useEffect, useState } from 'react';

export default function useTimer() {
  const [time, setTime] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve stored time from local storage
    const storedTime = localStorage.getItem('focusTime');
    if (storedTime) {
      setTime(parseInt(storedTime, 10));
    }

    // Start timer
    setTimerActive(true);
    const timerInterval = setInterval(() => {
      if (timerActive) {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem('focusTime', newTime.toString());
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timerActive]);

  const resetTimer = () => {
    setTime(0);
    localStorage.setItem('focusTime', '0');
  };

  return { time, resetTimer };
}
