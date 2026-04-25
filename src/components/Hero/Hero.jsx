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
import TaskDialog from '../TaskDialog/TaskDialog';

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
            {heroTask.dialog}
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
        <img src="/kofun-background-06.svg" />
      </div>
      <AnimatePresence>
        {isRunning && (
          <>
            <motion.div
              className={styles.blurFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              // transition={{ duration: 3, ease: 'easeInOut' }}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
      {isRunning && (
        <>
          <div key={activeTaskId} className={styles.numberTimer}>
            {formatTime(displayTime, false)}
          </div>
          <CircleTimer
            task={heroTask}
            displayTime={displayTime}
            duration={activeTask?.duration}
          />
        </>
      )}
      {activeTaskId && <TimerButton />}
      <HaniwaCharacter />
      <ForegroundArt />
    </header>
  );
};

export default Hero;
