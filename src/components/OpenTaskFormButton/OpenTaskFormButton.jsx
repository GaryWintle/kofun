import styles from '@/components/OpenTaskFormButton/OpenTaskFormButton.module.css';
import { motion } from 'motion/react';
import { buttonPress } from '@/animations/variants';

const OpenTaskFormButton = ({ setTaskModule }) => {
  return (
    <div className={styles.buttonContainer}>
      <motion.button
        {...buttonPress()}
        className={styles.openTaskFormButton}
        onClick={(e) => {
          e.stopPropagation();
          setTaskModule((prev) => !prev);
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.6846 14.3164H32V17.6846H17.6846V32H14.3164V17.6846H0V14.3164H14.3164V0H17.6846V14.3164Z"
            fill="url(#paint0_radial_2349_265)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_2349_265"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(16 16) rotate(90) scale(16)"
            >
              <stop stopColor="var(--highlight-green-300)" />
              <stop offset="1" stopColor="var(--highlight-green-500)" />
            </radialGradient>
          </defs>
        </svg>
      </motion.button>
    </div>
  );
};

export default OpenTaskFormButton;
