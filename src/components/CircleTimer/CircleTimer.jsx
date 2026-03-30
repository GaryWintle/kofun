import styles from '@/components/CircleTimer/CircleTimer.module.css';

const CircleTimer = ({ currentTime, duration }) => {
  const size = 350;
  const strokeWidth = 12;
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (currentTime / duration);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className={styles.container}>
      <svg width="350" height="350" viewBox="0 0 350 350">
        {
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#AAA"
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
            stroke="red"
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
