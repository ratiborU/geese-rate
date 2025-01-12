import { ICoupleResponse } from "../../services/coupleService"

export const getCoupleStatus = (couple: ICoupleResponse) => {
  const date = new Date(`${couple.date}T${couple.time}`);
  const dateNow = new Date();
  const long = 3600000 + 1800000; // полтора часа
  if (dateNow.getTime() < date.getTime()) {
    return 'Не начата'
  }
  if (dateNow.getTime() < date.getTime() + long) {
    return 'Идет'
  }
  return 'Завершена'
}

export const checkCoupleStatus = (couple: ICoupleResponse) => {
  const date = new Date(`${couple.date}T${couple.time}`);
  const dateNow = new Date();
  const long = 3600000 + 1800000; // полтора часа
  if (dateNow.getTime() < date.getTime()) {
    return 'Не начата'
  }
  if (dateNow.getTime() < date.getTime() + long) {
    return 'Идет'
  }
  return 'Завершена'
}