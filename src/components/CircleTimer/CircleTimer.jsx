import styles from '@/components/CircleTimer/CircleTimer.module.css';

const CircleTimer = ({ displayTime, duration }) => {
  const currentTime = Math.max(0, displayTime);

  const size = 350;
  const strokeWidth = 6;
  const backStrokeWidth = 6;
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = duration ? circumference * (currentTime / duration) : 0;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 350 350">
        <defs>
          <radialGradient
            id="timerGradient"
            gradientUnits="userSpaceOnUse"
            cx="0"
            cy="175"
            r="350"
          >
            <stop offset="10%" stopColor="#FF924C" />
            <stop offset="100%" stopColor="#FFCA3A" />
          </radialGradient>
          <filter id="myBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <circle
          className={styles.backCircle}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="hsla(285, 10%, 10%, 0.1)"
          strokeWidth={backStrokeWidth}
        />
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
          filter="url(#myBlur)"
        />
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
      </svg>
    </div>
  );
};

export default CircleTimer;
