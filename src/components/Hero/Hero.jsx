import styles from '@/components/Hero/Hero.module.css';
import formatTime from '@/utils/formatTime';
import CircleTimer from '@/components/CircleTimer/CircleTimer';
import TimerButton from '@/components/TimerButton/TimerButton';
import { motion, AnimatePresence } from 'motion/react';
import { heroTimerOpening, buttonPress } from '@/animations/variants';

const Hero = ({ state, dispatch, displayTime, activeTask }) => {
  const heroTask = state.tasks.find((task) => task.id === state.activeTaskId);

  return (
    <header className={styles.container}>
      <div className={styles.heroTextContainer}>
        <motion.div
          key={state.activeTaskId}
          className={styles.taskText}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 0.2 } }}
        >
          {heroTask?.text}
        </motion.div>
      </div>

      <div className={styles.backgroundArt}>
        <img src="/kofun-background-06.svg" />
      </div>

      <div className={styles.haniwaCharacter}>
        <img src="/kofun-haniwa-04.svg" />
      </div>

      {state.activeTaskId && (
        <>
          <motion.div
            key={state.activeTaskId}
            className={styles.numberTimer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ opacity: { duration: 0.2 } }}
          >
            {formatTime(displayTime, false)}
          </motion.div>
          <TimerButton isRunning={state.isRunning} dispatch={dispatch} />
          <CircleTimer
            displayTime={displayTime}
            duration={activeTask?.duration}
          />
        </>
      )}
      <div className={styles.foregroundLeft}>
        <img src="/kofun-foreground-left.svg" />
      </div>
      <div className={styles.foregroundRight}>
        <img src="/kofun-foreground-right.svg" />
      </div>
    </header>
  );
};

export default Hero;
