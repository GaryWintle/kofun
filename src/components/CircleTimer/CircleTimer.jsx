import useTimerStore from '@/store/timerStore';
import { motion } from 'motion/react';
import styles from '@/components/CircleTimer/CircleTimer.module.css';
import clsx from 'clsx';

const CircleTimer = ({
  task,
  displayTime,
  duration,
  timerStrokeWidth = 4,
  circleWidth = '100%',
  circlePadding = '5%',
}) => {
  const activeTaskId = useTimerStore((state) => state.activeTaskId);
  // const task = useTimerStore((state) => state.task);

  const currentTime = Math.max(0, displayTime);

  const strokeColor =
    currentTime <= 10
      ? 'var(--highlight-red-300)'
      : currentTime <= 120
        ? 'var(--highlight-yellow-300)'
        : 'var(--highlight-green-300)';

  const size = 350;
  const strokeWidth = timerStrokeWidth;
  const backStrokeWidth = timerStrokeWidth;
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = duration ? circumference * (currentTime / duration) : 0;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <motion.div
      className={styles.container}
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
      <svg
        style={{ width: circleWidth, padding: circlePadding }}
        viewBox="0 0 350 350"
      >
        <filter id="myBlur">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <circle
          className={clsx(styles.backCircle, {
            [styles.selectedBackCircle]: activeTaskId === task.id,
          })}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="oklch(from var(--green-700) l c h / 0.15)"
          strokeWidth={backStrokeWidth}
        />
        <circle
          className={styles.progressCircle}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          filter="url(#myBlur)"
        />
        <circle
          className={styles.progressCircle}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
    </motion.div>
  );
};

export default CircleTimer;
