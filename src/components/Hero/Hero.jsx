import styles from '@/components/Hero/Hero.module.css';
import formatTime from '@/utils/formatTime';
import { motion, AnimatePresence } from 'motion/react';
import { heroTimerOpening, buttonPress } from '@/animations/variants';

import CircleTimer from '@/components/CircleTimer/CircleTimer';
import TimerButton from '@/components/TimerButton/TimerButton';
import DialogBubble from '@/components/DialogBubble/DialogBubble';
import HaniwaCharacter from '../HaniwaCharacter/HaniwaCharacter';
import ForegroundArt from '../ForegroundArt/ForegroundArt';

const Hero = ({ state, dispatch, displayTime, activeTask }) => {
  const heroTask = state.tasks.find((task) => task.id === state.activeTaskId);

  return (
    <header className={styles.container}>
      <DialogBubble>
        Oh wow, writing a blog post? Are you starting with pen and paper or
        clickity clacking?
      </DialogBubble>
      <div className={styles.heroTextContainer}>
        <div key={state.activeTaskId} className={styles.taskText}>
          {heroTask?.text}
        </div>
      </div>

      <div className={styles.backgroundArt}>
        <img src="/kofun-background-06.svg" />
      </div>

      <div className={styles.blurFilter}></div>
      {state.activeTaskId && (
        <>
          <div key={state.activeTaskId} className={styles.numberTimer}>
            {formatTime(displayTime, false)}
          </div>
          <TimerButton isRunning={state.isRunning} dispatch={dispatch} />
          <CircleTimer
            displayTime={displayTime}
            duration={activeTask?.duration}
            task={heroTask}
            activeTaskId={state.activeTaskId}
          />
        </>
      )}
      <HaniwaCharacter />
      <ForegroundArt />
    </header>
  );
};

export default Hero;
