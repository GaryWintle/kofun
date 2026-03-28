import { useEffect } from 'react';

function useTimer(isRunning, activeTask, dispatch) {
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (!activeTask) return;

    !activeTask.remainingTime && dispatch({ type: 'COMPLETE_TASK' });
  }, [activeTask?.remainingTime]);
}

export default useTimer;
