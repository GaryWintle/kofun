import styles from '@/components/DialogBubble/DialogBubble.module.css';

const DialogBubble = ({ children }) => {
  return (
    <div className={styles.dialogBubble}>
      <p className={styles.dialogText}>{children}</p>
    </div>
  );
};

export default DialogBubble;
