import styles from '@/components/HaniwaCharacter/HaniwaCharacter.module.css';
import { useState, useEffect } from 'react';
import { useLottie } from 'lottie-react';
import haniwaTest from '@/animations/haniwa-test-02.json';

const HaniwaCharacter = () => {
  const [emotion, setEmotion] = useState('Idle');

  const { View, goToAndPlay } = useLottie({
    animationData: haniwaTest,
    loop: true,
    autoplay: true,
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
};

export default HaniwaCharacter;
