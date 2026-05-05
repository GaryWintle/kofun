import styles from '@/components/HaniwaCharacter/HaniwaCharacter.module.css';
import { useState, useEffect, memo } from 'react';
import { useLottie } from 'lottie-react';
import haniwaTest from '@/animations/haniwa-test-02.json';
import useTimerStore from '@/store/timerStore';

const HaniwaCharacter = memo(() => {
  const currentEmotion = useTimerStore((state) => state.currentEmotion);
  const setCurrentEmotion = useTimerStore((state) => state.setCurrentEmotion);
  const isRunning = useTimerStore((state) => state.isRunning);

  const { View, goToAndPlay } = useLottie({
    animationData: haniwaTest,
    loop: true,
    autoplay: false,
  });

  useEffect(() => {
    setCurrentEmotion(isRunning ? 'Meditate' : 'Idle');
  }, [isRunning]);

  useEffect(() => {
    goToAndPlay(currentEmotion, true);
  }, [currentEmotion]);

  return <div className={styles.haniwaCharacter}>{View}</div>;
});

export default HaniwaCharacter;
