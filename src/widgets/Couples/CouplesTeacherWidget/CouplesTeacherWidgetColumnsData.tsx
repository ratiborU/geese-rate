import LinkButton from "../../../components/UI/LinkButton/LinkButton";

export const tableName = 'Lessons';

export const headerLabels = [
  '',
  'Редактировать',
  'Дата проведения',
  'Статус',
  'Ссылка на QR',
  'Список студентов',
];

export const keys = [
  'id',
  'date',
  'date',
  'id',
  'id',
];

export const renderCels = [
  (text: string) => <LinkButton to={`/admin/couples/edit/${text}`} text='Редактировать' width={240} />,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <LinkButton to={`/teacher/qr/${text}`} text='QR' width={240} />,
  (text: string) => <LinkButton to={`/teacher/couples/review/${text}`} text='Перейти' width={240} />,
];
