import { monthsDictionary } from "./parseDate";

export const parseDateTime = (inputDate: string) => {
  // const [date, time] = input.split('T')
  const date = new Date(inputDate);
  const resDate = `${date.getDate()} ${monthsDictionary[String(date.getMonth() + 1) as keyof typeof monthsDictionary]} ${date.getFullYear()}`;
  const resTime = `${date.getHours()}:${date.getUTCMinutes() < 10 ? '0' : ''}${date.getUTCMinutes()}:${date.getUTCSeconds() < 10 ? '0' : ''}${date.getUTCSeconds()}`;
  return `${resDate} ${resTime}`
}