import styles from '@/components/CircleTimer/CircleTimer.module.css';
import clsx from 'clsx';

const CircleTimer = ({
  task,
  activeTaskId,
  displayTime,
  duration,
  timerStrokeWidth = 4,
  circleWidth = '100%',
  circlePadding = '5%',
}) => {
  const currentTime = Math.max(0, displayTime);

  const size = 350;
  const strokeWidth = timerStrokeWidth;
  const backStrokeWidth = timerStrokeWidth;
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = duration ? circumference * (currentTime / duration) : 0;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className={styles.container}>
      <svg
        style={{ width: circleWidth, padding: circlePadding }}
        viewBox="0 0 350 350"
      >
        <defs>
          <radialGradient
            id="timerGradient"
            gradientUnits="userSpaceOnUse"
            cx="0"
            cy="175"
            r="350"
          >
            <stop offset="10%" stopColor="var(--highlight-green-300)" />
            <stop offset="100%" stopColor="var(--highlight-green-400)" />
          </radialGradient>
          <radialGradient
            id="redTimerGradient"
            gradientUnits="userSpaceOnUse"
            cx="0"
            cy="175"
            r="350"
          >
            <stop offset="10%" stopColor="var(--highlight-red-300)" />
            <stop offset="100%" stopColor="var(--highlight-red-400)" />
          </radialGradient>
          <filter id="myBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
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
          stroke={
            currentTime < 10 ? 'url(#redTimerGradient)' : 'url(#timerGradient)'
          }
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
          stroke={
            currentTime < 10 ? 'url(#redTimerGradient)' : 'url(#timerGradient)'
          }
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
    </div>
  );
};

export default CircleTimer;
