export const timeToHours = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  console.log(hours + minutes / 60 + seconds / 3600);
  return hours + minutes / 60 + seconds / 3600;
};
export const subtractTimeString = (timeStr) => {
  const [hours, minutes, seconds = 0] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(date.getHours() - hours);
  date.setMinutes(date.getMinutes() - minutes);
  date.setSeconds(date.getSeconds() - seconds);
  return date;
};
