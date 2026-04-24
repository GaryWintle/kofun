import styles from '@/components/TimerButton/TimerButton.module.css';
import useTimerStore from '@/store/timerStore';
import { motion } from 'motion/react';
import { buttonPress } from '@/animations/variants';

const TimerButton = () => {
  const isRunning = useTimerStore((state) => state.isRunning);
  const startTimer = useTimerStore((state) => state.startTimer);
  const pauseTimer = useTimerStore((state) => state.pauseTimer);

  return (
    <div className={styles.container}>
      <motion.button
        {...buttonPress()}
        className={styles.button}
        onClick={(e) => {
          e.stopPropagation();
          isRunning ? pauseTimer() : startTimer();
        }}
      >
        {isRunning ? (
          <img src="/buttons-icons/kofun-button-pause-02.svg" />
        ) : (
          <img src="/buttons-icons/kofun-button-play.svg" />
        )}
      </motion.button>
    </div>
  );
};

export default TimerButton;
