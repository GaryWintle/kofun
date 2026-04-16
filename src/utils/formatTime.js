function formatTime(time) {
  if (!time) return `0`;

  const minutes = Math.floor((time / 60) % 60);
  const seconds = time % 60;
  const hours = Math.floor(time / 3600);

  const numPadding = (num) => {
    return String(num).padStart(2, 0);
  };

  const formattedTime = `${hours}h${numPadding(minutes)}m`;

  const underHourTime = `${minutes}m`;

  const underMinuteTime = `${seconds}s`;

  if (time < 60) {
    return underMinuteTime;
  } else if (time < 3600) {
    return underHourTime;
  } else return formattedTime;
}

export default formatTime;
