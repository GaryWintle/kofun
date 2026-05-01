import styles from '@/components/HaniwaCharacter/HaniwaCharacter.module.css';
import { useState, useEffect, memo } from 'react';
import { useLottie } from 'lottie-react';
import haniwaTest from '@/animations/haniwa-test-02.json';
import useTimerStore from '@/store/timerStore';

const HaniwaCharacter = memo(() => {
  // const [emotion, setEmotion] = useState('Idle');
  const isRunning = useTimerStore((state) => state.isRunning);

  const emotion = isRunning ? 'Meditate' : 'Idle';

  const { View, goToAndPlay } = useLottie({
    animationData: haniwaTest,
    loop: true,
    autoplay: false,
  });

  useEffect(() => {
    goToAndPlay(emotion, true);
  }, [emotion, goToAndPlay]);

  return (
    <div className={styles.haniwaCharacter}>
      {View}
      {/* <img src="/kofun-haniwa-04.svg" /> */}
    </div>
  );
});

export default HaniwaCharacter;
