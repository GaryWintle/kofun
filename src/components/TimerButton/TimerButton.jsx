import styles from '@/components/TimerButton/TimerButton.module.css';

const TimerButton = ({ isRunning, dispatch }) => {
  return (
    <button
      className={styles.container}
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
