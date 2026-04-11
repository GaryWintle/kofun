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
        <div className={styles.heroText}>{heroTask?.text}</div>
      </div>

      <div className={styles.counterContainer}>
        <div className={styles.innerCounterContainer}>
          <div className={styles.haniwa}>
            <img src="/kofun-haniwa.svg" />
          </div>
          <div className={styles.heroTime}>{formatTime(displayTime)}</div>
          <TimerButton isRunning={state.isRunning} dispatch={dispatch} />
        </div>
        <CircleTimer
          displayTime={displayTime}
          duration={activeTask?.duration}
        />
        <div className={styles.backgroundIllo}>
          <img src="/kofunbg-02.svg" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
