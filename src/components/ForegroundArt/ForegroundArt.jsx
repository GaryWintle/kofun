import styles from '@/components/ForegroundArt/ForegroundArt.module.css';

const ForegroundArt = () => {
  return (
    <>
      <div className={styles.foregroundLeft}>
        <img src="/hero-parts/kofun-new-fg-left.svg" />
      </div>
      <div className={styles.foregroundRight}>
        <img src="/hero-parts/kofun-new-fg-right.svg" />
      </div>
    </>
  );
};

export default ForegroundArt;
