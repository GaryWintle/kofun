import { useEffect } from 'react';

function useTimer(isRunning, dispatch) {
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, dispatch]);
}

export default useTimer;
