import { useEffect, useState } from 'react';
import useTimerStore from '@/store/timerStore';

function useTimer(activeTask, displayTime) {
  const isRunning = useTimerStore((state) => state.isRunning);
  const completeTask = useTimerStore((state) => state.completeTask);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, completeTask]);

  useEffect(() => {
    if (!activeTask) return;

    displayTime <= 0 && completeTask();
  }, [displayTime]);
}

export default useTimer;
