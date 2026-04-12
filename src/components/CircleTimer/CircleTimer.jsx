import styles from '@/components/CircleTimer/CircleTimer.module.css';

const CircleTimer = ({ displayTime, duration }) => {
  const currentTime = Math.max(0, displayTime);

  const size = 350;
  const strokeWidth = 8;
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = duration ? circumference * (currentTime / duration) : 0;
  const cx = size / 2;
  const cy = size / 2;

  console.log({ currentTime, duration, offset, circumference });

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 350 350">
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#50E7C4" />
            <stop offset="100%" stopColor="#2BCE8B" />
          </linearGradient>
        </defs>
        {
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="hsl(285, 7%, 22%)"
            strokeWidth={strokeWidth}
          />
        }
        {
          <circle
            className={styles.progressCircle}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="url(#timerGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        }
      </svg>
    </div>
  );
};

export default CircleTimer;
