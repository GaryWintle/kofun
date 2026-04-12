import Image from 'next/image';
import styles from '@/components/Hero/Hero.module.css';
import formatTime from '@/utils/formatTime';
import CircleTimer from '@/components/CircleTimer/CircleTimer';
import TimerButton from '@/components/TimerButton/TimerButton';

const Hero = ({ state, dispatch, displayTime, activeTask }) => {
  const heroTask = state.tasks.find((task) => task.id === state.activeTaskId);

  return (
    <header className={styles.container}>
      <div className={styles.heroTextContainer}>
        <div className={styles.taskText}>{heroTask?.text}</div>
      </div>

      <div className={styles.backgroundArt}>
        <img src="/kofun-background-03.svg" />
      </div>

      <div className={styles.haniwaCharacter}>
        <img src="/kofun-haniwa-03.svg" />
      </div>

      <CircleTimer displayTime={displayTime} duration={activeTask?.duration} />
      <div className={styles.foregroundLeft}>
        <img src="/kofun-foreground-left.svg" />
      </div>
      <div className={styles.foregroundRight}>
        <img src="/kofun-foreground-right.svg" />
      </div>

      <div className={styles.numberTimer}>{formatTime(displayTime)}</div>

      <TimerButton isRunning={state.isRunning} dispatch={dispatch} />
    </header>
  );
};

export default Hero;
