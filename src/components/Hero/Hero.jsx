import styles from '@/components/Hero/Hero.module.css';

const Hero = ({ state }) => {
  const heroTask = state.tasks.find((task) => task.id === state.activeTaskId);

  return (
    <header className={styles.container}>
      <div className={styles.heroText}>{heroTask?.text}</div>
      <div className={styles.heroTime}>{heroTask?.remainingTime}</div>
    </header>
  );
};

export default Hero;
