export const buttonPress = (tapStrength = 0.95) => ({
  whileHover: { scale: 1.02 },
  whileTap: { scale: tapStrength, y: 1, filter: 'brightness(0.85)' },
  transition: { duration: 0.1, ease: 'easeIn' },
});

export const moduleSlideInOut = {
  initial: { y: '100%', scale: 0.9, opacity: 0 },
  animate: {
    y: 0,
    scale: 1,
    opacity: [0, 0, 1],
    transition: {
      y: { type: 'spring', stiffness: 300, damping: 32 },
      scale: { type: 'spring', stiffness: 300, damping: 32 },
      opacity: { duration: 0.3, times: [0, 0.3, 1] },
    },
  },
  exit: {
    y: '100%',
    scale: 0.9,
    opacity: 0,
    transition: {
      y: { type: 'spring', stiffness: 300, damping: 32 },
      scale: { type: 'spring', stiffness: 300, damping: 32 },
      opacity: { duration: 0.3 },
    },
  },
};

export const heroTimerOpening = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.1 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

export const iconPop = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: { type: 'spring', stiffness: 300, damping: 30, delay: 0.01 },
      opacity: { duration: 0.12, delay: 0.01 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    transition: {
      scale: { duration: 0.1, ease: 'easeIn' },
      opacity: { duration: 0.1, ease: 'easeIn' },
    },
  },
};

export const elSwap = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};
