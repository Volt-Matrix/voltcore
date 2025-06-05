 export const timeToHours = (timeString)=> {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    console.log(hours + minutes / 60 + seconds / 3600);
    return hours + minutes / 60 + seconds / 3600;
  }