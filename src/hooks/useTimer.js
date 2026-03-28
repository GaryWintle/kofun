import { useEffect } from 'react';

function useTimer(isRunning, activeTask, dispatch, displayTime) {
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (!activeTask) return;

    displayTime <= 0 && dispatch({ type: 'COMPLETE_TASK' });
  }, [displayTime]);
}

export default useTimer;
