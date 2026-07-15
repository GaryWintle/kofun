import styles from '@/components/Hero/Hero.module.css';
import useTimerStore from '@/store/timerStore';
import formatTime from '@/utils/formatTime';
import { motion, AnimatePresence } from 'motion/react';
import { heroTimerOpening, buttonPress } from '@/animations/variants';

import CircleTimer from '@/components/CircleTimer/CircleTimer';
import TimerButton from '@/components/TimerButton/TimerButton';
import DialogBubble from '@/components/DialogBubble/DialogBubble';
import HaniwaCharacter from '../HaniwaCharacter/HaniwaCharacter';
import ForegroundArt from '../ForegroundArt/ForegroundArt';

const Hero = ({ displayTime, activeTask }) => {
  const tasks = useTimerStore((state) => state.tasks);
  const activeTaskId = useTimerStore((state) => state.activeTaskId);
  const isRunning = useTimerStore((state) => state.isRunning);

  const heroTask = tasks.find((task) => task.id === activeTaskId);

  return (
    <header className={styles.container}>
      <AnimatePresence>
        {activeTaskId && !isRunning ? (
          <DialogBubble>
            {/* <TaskDialog /> */}
            {heroTask?.dialog}
          </DialogBubble>
        ) : null}
      </AnimatePresence>
      <div className={styles.heroTextContainer}>
        {isRunning && (
          <div key={activeTaskId} className={styles.taskText}>
            {heroTask?.text}
          </div>
        )}
      </div>

      <div className={styles.backgroundArt}>
        <img src="/hero-parts/kofun-new-bg.svg" />
      </div>
      <AnimatePresence>
        {isRunning && (
          <>
            <motion.div
              className={styles.blurFilterText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              // transition={{ duration: 3, ease: 'easeInOut' }}
            ></motion.div>
            <motion.div
              className={styles.blurFilterTimer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              // transition={{ duration: 3, ease: 'easeInOut' }}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRunning && heroTask && (
          <>
            <motion.div
              key={activeTaskId}
              className={styles.numberTimer}
              initial={{ opacity: 0.3, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                scale: 1.5,
                transition: { duration: 0.2 },
              }}
            >
              {formatTime(displayTime, false)}
            </motion.div>
            <CircleTimer
              task={heroTask}
              displayTime={displayTime}
              duration={activeTask?.duration}
              timerStrokeWidth={12}
            />
          </>
        )}
      </AnimatePresence>
      <HaniwaCharacter />
      <AnimatePresence>
        {activeTaskId && <TimerButton key="timer-button" />}
      </AnimatePresence>
      <ForegroundArt />
    </header>
  );
};

export default Hero;
