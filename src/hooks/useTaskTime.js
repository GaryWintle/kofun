import { useState, useRef } from 'react';

export function useTaskTime(initial = 0) {
  const [taskTime, setTaskTime] = useState(initial);
  const intervalRef = useRef(0);

  const decrement = (amount) => {
    setTaskTime((prev) => Math.max(0, prev - amount));
  };
  const increment = (amount) => {
    setTaskTime((prev) => prev + amount);
  };

  const holdIncrement = (amount) => {
    const intervalId = setInterval(() => {
      console.log('tick fired', Date.now());

      setTaskTime((prev) => prev + amount);
    }, 300);
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
    holdIncrement,
    increment,
    decrement,
    stopInterval,
    reset,
  };
}
