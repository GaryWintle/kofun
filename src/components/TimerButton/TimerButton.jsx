import styles from '@/components/TimerButton/TimerButton.module.css';
import { motion } from 'motion/react';
import { heroTimerOpening, buttonPress } from '@/animations/variants';

const TimerButton = ({ isRunning, dispatch }) => {
  return (
    <div className={styles.container}>
      <motion.button
        {...buttonPress}
        className={styles.button}
        onClick={(e) => {
          e.stopPropagation();
          isRunning
            ? dispatch({ type: 'PAUSE_TIMER' })
            : dispatch({ type: 'START_TIMER' });
        }}
      >
        {isRunning ? (
          <img src="/buttons-icons/kofun-button-pause.svg" />
        ) : (
          <img src="/buttons-icons/kofun-button-play.svg" />
        )}
      </motion.button>
    </div>
  );
};

export default TimerButton;
