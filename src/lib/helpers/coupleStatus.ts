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

// поправить на возвращение true, false или хз пока
export const checkCoupleStatus = (couple: ICoupleResponse) => {
  const date = new Date(`${couple.date}T${couple.time}`);
  const dateNow = new Date();
  // 3600000 один час, 60000 минута, 1000 секунда, 1 милисекунда
  const long = 3600000 + 1800000; // полтора часа
  if (dateNow.getTime() < date.getTime()) {
    return 'Не начата'
  }
  if (dateNow.getTime() < date.getTime() + long) {
    return 'Идет'
  }
  return 'Завершена'
}