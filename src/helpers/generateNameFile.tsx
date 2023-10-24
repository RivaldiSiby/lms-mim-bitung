export const generateNameFile = (name: string) => {
  const wrapName = name.split(".");
  const fileName = wrapName[wrapName.length - 1];
  return fileName;
};
