import styles from '@/components/TimerButton/TimerButton.module.css';

const TimerButton = ({ isRunning, dispatch }) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => {
          isRunning
            ? dispatch({ type: 'PAUSE_TIMER' })
            : dispatch({ type: 'START_TIMER' });
        }}
      >
        {isRunning ? (
          <img src="/buttons-icons/kofun-button-pause.svg" />
        ) : (
          <img src="/buttons-icons/kofun-button-play.svg" />
        )}
      </button>
    </div>
  );
};

export default TimerButton;
