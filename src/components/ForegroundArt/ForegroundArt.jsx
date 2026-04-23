import styles from '@/components/ForegroundArt/ForegroundArt.module.css';

const ForegroundArt = () => {
  return (
    <>
      <div className={styles.foregroundLeft}>
        <img src="/kofun-foreground-left.svg" />
      </div>
      <div className={styles.foregroundRight}>
        <img src="/kofun-foreground-right.svg" />
      </div>
    </>
  );
};

export default ForegroundArt;
