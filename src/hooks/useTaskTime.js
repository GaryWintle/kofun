import { useState, useRef } from 'react';

export function useTaskTime(initial = 1200, min = 0, max = Infinity) {
  const [taskTime, setTaskTime] = useState(initial);
  const intervalRef = useRef(0);

  const clamp = (value) => Math.min(max, Math.max(value, min));

  const decrement = (amount) => {
    setTaskTime((prev) => clamp(prev - amount));
  };
  const increment = (amount) => {
    setTaskTime((prev) => clamp(prev + amount));
  };
  const holdDecrement = (amount) => {
    let tickCount = 0;

    const intervalId = setInterval(() => {
      tickCount++;

      let scaledAmount = amount;

      if (tickCount > 20) {
        scaledAmount = amount * 5;
      } else if (tickCount > 10) {
        scaledAmount = amount * 2;
      }

      setTaskTime((prev) => clamp(prev - scaledAmount));
    }, 200);

    intervalRef.current = intervalId;
  };

  const holdIncrement = (amount) => {
    let tickCount = 0;

    const intervalId = setInterval(() => {
      tickCount++;

      let scaledAmount = amount;

      if (tickCount > 20) {
        scaledAmount = amount * 5;
      } else if (tickCount > 10) {
        scaledAmount = amount * 2;
      }

      setTaskTime((prev) => clamp(prev + scaledAmount));
    }, 100);

    intervalRef.current = intervalId;
  };

  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };

  const presetTime = (amount) => {
    setTaskTime((prev) => amount);
  };

  const reset = () => setTaskTime(initial);

  return {
    taskTime,
    presetTime,
    holdDecrement,
    holdIncrement,
    increment,
    decrement,
    stopInterval,
    reset,
  };
}
