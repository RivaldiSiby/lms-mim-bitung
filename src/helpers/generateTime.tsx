export function formatDuration(time: any) {
  const timenow: any = new Date().getTime();
  let duration = timenow - time;
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  const timeUnits = [];

  if (days > 0) {
    timeUnits.push(`${days} hari lalu`);
  }

  if (days < 1) {
    if (remainingHours > 0) {
      timeUnits.push(`${remainingHours} jam lalu`);
    }
  }
  if (remainingHours < 1) {
    if (remainingMinutes > 0) {
      timeUnits.push(`${remainingMinutes} menit lalu`);
    }
  }
  if (remainingMinutes < 1) {
    timeUnits.push(`Baru Saja`);
  }

  return timeUnits.join(", ");
}

const handlerNum = (n: any) => {
  return n < 10 ? `0${n}` : `${n}`;
};

export function formatTimer(start: any, duration: string) {
  if (start === "") {
    return "";
  }
  const timenow = new Date().getTime();
  let durationTimeOut = parseInt(duration) * 60000;
  let timeEnd = start + durationTimeOut;
  let distance = timeEnd - timenow;

  // Time calculations
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (distance <= 0) return "waktu habis";
  return `${handlerNum(hours)}:${handlerNum(minutes)}:${handlerNum(seconds)}`;
}
