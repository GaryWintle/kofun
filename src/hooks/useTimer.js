import { useEffect } from 'react';

function useTimer(isRunning, activeTask, dispatch) {
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      // console.log('TICK FIRING');
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (!activeTask) return;

    !activeTask.displayTime && dispatch({ type: 'COMPLETE_TASK' });
  }, [activeTask?.displayTime]);
}

export default useTimer;
