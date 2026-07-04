import styles from '@/components/TaskFormCancelButton/TaskFormCancelButton.module.css';
import { motion } from 'motion/react';
import { buttonPress } from '@/animations/variants';

const TaskFormCancelButton = ({ setTaskModule }) => {
  return (
    <motion.button
      {...buttonPress()}
      className={styles.cancelButton}
      type="button"
      onClick={(e) => {
        setTaskModule((prev) => !prev);
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 1.52344L9.52246 8L16 14.4766L14.4766 16L7.99902 9.52246L1.52344 15.999L0 14.4756L6.47559 8L0 1.52441L1.52344 0.000976562L7.99902 6.47656L14.4766 0L16 1.52344Z"
          fill="#70FFA7"
        />
      </svg>
    </motion.button>
  );
};

export default TaskFormCancelButton;
