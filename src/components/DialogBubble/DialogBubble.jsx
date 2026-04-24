import styles from '@/components/DialogBubble/DialogBubble.module.css';
import { motion } from 'motion/react';

const DialogBubble = ({ children }) => {
  return (
    <motion.div
      className={styles.dialogBubble}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <motion.p
        className={styles.dialogText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        {children}
      </motion.p>
    </motion.div>
  );
};

export default DialogBubble;
