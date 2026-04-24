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

  const heroTask = tasks.find((task) => task.id === activeTaskId);

  return (
    <header className={styles.container}>
      {/* <DialogBubble>
        Oh wow, writing a blog post? Are you starting with pen and paper or
        clickity clacking?
      </DialogBubble> */}
      <div className={styles.heroTextContainer}>
        <div key={activeTaskId} className={styles.taskText}>
          {heroTask?.text}
        </div>
      </div>

      <div className={styles.backgroundArt}>
        <img src="/kofun-background-06.svg" />
      </div>

      <div className={styles.blurFilter}></div>
      {activeTaskId && (
        <>
          <div key={activeTaskId} className={styles.numberTimer}>
            {formatTime(displayTime, false)}
          </div>
          <TimerButton />
          <CircleTimer
            task={heroTask}
            displayTime={displayTime}
            duration={activeTask?.duration}
          />
        </>
      )}
      <HaniwaCharacter />
      <ForegroundArt />
    </header>
  );
};

export default Hero;
