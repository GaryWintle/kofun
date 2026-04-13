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
      {isRunning ? (
        <img src="/kofun-button-pause.svg" width="57" height="57" />
      ) : (
        <img src="/kofun-button-play.svg" width="57" height="57" />
      )}
    </button>
  );
};

export default TimerButton;
