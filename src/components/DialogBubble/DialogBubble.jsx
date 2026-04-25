import styles from '@/components/DialogBubble/DialogBubble.module.css';
import { motion } from 'motion/react';

const DialogBubble = ({ children }) => {
  return (
    <motion.div
      className={styles.dialogBubble}
      initial={{ opacity: 0, x: '-50%', y: 10 }}
      animate={{
        opacity: 1,
        x: '-50%',
        y: 0,

        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      exit={{
        opacity: 0,
        x: '-50%',
        y: 6,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default DialogBubble;
