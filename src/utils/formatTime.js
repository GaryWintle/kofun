function formatTime(time) {
  if (!time) return `0`;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const hours = Math.floor(minutes / 60);

  const numPadding = (num) => {
    return String(num).padStart(2, 0);
  };

  const formattedTime = `${hours}:${numPadding(minutes)}:${numPadding(seconds)}`;

  const underHourTime = `${numPadding(minutes)}:${numPadding(seconds)}`;

  const underMinuteTime = `${seconds}s`;

  if (time < 60) {
    return underMinuteTime;
  } else if (time < 3600) {
    return underHourTime;
  } else return formattedTime;
}

export default formatTime;
