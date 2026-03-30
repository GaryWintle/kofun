import styles from '@/components/Hero/Hero.module.css';
import formatTime from '@/utils/formatTime';
import CircleTimer from '@/components/CircleTimer/CircleTimer';
import TimerButton from '@/components/TimerButton/TimerButton';

const Hero = ({ state, dispatch, displayTime, activeTask }) => {
  const heroTask = state.tasks.find((task) => task.id === state.activeTaskId);

  return (
    <header className={styles.container}>
      {activeTask && (
        <>
          <div className={styles.heroText}>{heroTask?.text}</div>
          <div className={styles.counterContainer}>
            <div className={styles.heroTime}>{formatTime(displayTime)}</div>
            <TimerButton isRunning={state.isRunning} dispatch={dispatch} />
            <CircleTimer
              displayTime={displayTime}
              duration={activeTask?.duration}
            />
          </div>
        </>
      )}
    </header>
  );
};

export default Hero;
