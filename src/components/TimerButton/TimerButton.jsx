import styles from '@/components/TimerButton/TimerButton.module.css';
import useTimerStore from '@/store/timerStore';
import { AnimatePresence, motion } from 'motion/react';
import { buttonPress, heroTimerOpening, iconPop } from '@/animations/variants';

const TimerButton = () => {
  const isRunning = useTimerStore((state) => state.isRunning);
  const startTimer = useTimerStore((state) => state.startTimer);
  const pauseTimer = useTimerStore((state) => state.pauseTimer);

  return (
    <div className={styles.container}>
      <motion.button
        {...buttonPress()}
        className={styles.button}
        variants={heroTimerOpening}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => {
          e.stopPropagation();
          isRunning ? pauseTimer() : startTimer();
        }}
      >
        <AnimatePresence mode="wait">
          {isRunning ? (
            // PAUSE
            <div key="pause" className={styles.startTaskButton}>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={iconPop}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <rect
                  x="4"
                  y="1"
                  width="5.99998"
                  height="21.9999"
                  rx="1"
                  fill="#202F33"
                />
                <rect
                  x="14"
                  y="1"
                  width="5.99998"
                  height="21.9999"
                  rx="1"
                  fill="#202F33"
                />
              </motion.svg>
            </div>
          ) : (
            // PLAY
            <div key="play" className={styles.startTaskButton}>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={iconPop}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <g clipPath="url(#clip0_2459_498)">
                  <path
                    d="M22.8349 13.0839L5.10411 23.4822C4.34396 23.9285 3.37541 23.3977 3.35723 22.5265L2.9948 2.32073C2.97662 1.44959 3.93093 0.904521 4.70959 1.31222L22.8028 11.1198C23.5811 11.5446 23.5953 12.6205 22.8352 13.0669L22.8349 13.0839Z"
                    fill="#202F33"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2459_498">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </motion.svg>
            </div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default TimerButton;
