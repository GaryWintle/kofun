const TimerButton = ({ isRunning, dispatch }) => {
  return (
    <button
      onClick={() => {
        isRunning
          ? dispatch({ type: 'PAUSE_TIMER' })
          : dispatch({ type: 'START_TIMER' });
      }}
    >
      {isRunning ? 'pause' : 'play'}
    </button>
  );
};

export default TimerButton;
