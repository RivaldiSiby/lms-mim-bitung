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
