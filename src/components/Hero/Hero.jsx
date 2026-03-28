import styles from '@/components/Hero/Hero.module.css';
import formatTime from '@/utils/formatTime';

const Hero = ({ state, dispatch }) => {
  const heroTask = state.tasks.find((task) => task.id === state.activeTaskId);

  return (
    <header className={styles.container}>
      <div className={styles.heroText}>{heroTask?.text}</div>
      <div className={styles.heroTime}>
        {formatTime(heroTask?.remainingTime)}
      </div>
      <button
        onClick={() => {
          state.isRunning
            ? dispatch({ type: 'PAUSE_TIMER' })
            : dispatch({ type: 'START_TIMER' });
        }}
      >
        {state.isRunning ? 'pause' : 'play'}
      </button>
    </header>
  );
};

export default Hero;
