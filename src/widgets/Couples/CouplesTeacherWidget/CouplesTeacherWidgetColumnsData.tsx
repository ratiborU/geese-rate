import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { ICoupleResponse } from "../../../services/coupleService";
import { parseDate } from "../../../lib/helpers/parseDate";
// import { getCoupleStatus } from "../../../lib/helpers/coupleStatus";
import { getCoupleStatus } from "../../../lib/helpers/coupleStatus";

export const tableName = 'Lessons';

export const headerLabels = [
  '',
  'Редактировать',
  'Дата проведения',
  'Статус',
  'Средний рейтинг',
  'Ссылка на QR',
  'Список студентов',
];


export const renderCels = [
  (text: ICoupleResponse) => <LinkButton to={`/admin/couples/edit/${text.id}`} text='Редактировать' width={240} />,
  (text: ICoupleResponse) => <>{parseDate(text.date)}, {text.time}</>,
  (text: ICoupleResponse) => <>{getCoupleStatus(text)}</>,
  (text: ICoupleResponse) => <>{Number(text.average_rating).toFixed(2)}</>,
  (text: ICoupleResponse) => <LinkButton to={`/teacher/qr/${text.id}`} text='QR' width={240} />,
  (text: ICoupleResponse) => <LinkButton to={`/teacher/couples/review/${text.id}?course=${text.course}`} text='Перейти' width={240} />,
];
