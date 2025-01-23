export const checkFormAvailable = (inputDate: string, inputTime: string) => {
  const date = new Date(`${inputDate}T${inputTime}`);
  const dateNow = new Date();
  const long = 24 * 60 * 60 * 1000; // 24 часа
  if (Math.abs(dateNow.getTime() - date.getTime()) < long) {
    return false;
  }
  return true
}