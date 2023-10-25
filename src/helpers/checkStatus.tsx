export const checkStatus = (data: any) => {
  if (data.tugas_file === "") return 1;

  const tugasCreatedTime = parseInt(data.tugas_created_at);
  const tugasTimeUp = new Date(`${data.tugas_payload.date}`).getTime();
  if (tugasCreatedTime > tugasTimeUp) return 2;
  return 3;
};
