export const buttonPress = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95, y: 1, filter: 'brightness(0.85)' },
  transition: { duration: 0.1, ease: 'easeIn' },
};

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
    opacity: [1, 0, 0],
    transition: {
      y: { type: 'spring', stiffness: 400, damping: 35 },
      scale: { type: 'spring', stiffness: 400, damping: 35 },
      opacity: { duration: 0.3, times: [0, 0.3, 1] },
    },
  },
};
