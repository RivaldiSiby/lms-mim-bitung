export const generateDateStatus = (date: string) => {
  const dateCheck = new Date(date).getTime();
  const dateNow = new Date().getTime();
  if (dateCheck > dateNow) return 1;
  return 3;
};

export const generateDateInfo = (date: string) => {
  const arrMonth = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const dateSplit = date.split("-");
  const day = dateSplit[2];
  const month = arrMonth[parseInt(dateSplit[1]) - 1];
  const year = dateSplit[0];
  return `${day} ${month} ${year}`;
};
