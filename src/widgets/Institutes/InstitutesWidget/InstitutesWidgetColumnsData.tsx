// import Button from "../../../components/UI/Button/Button";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";

export const tableName = 'Institutes';

export const headerLabels = [
  '',
  'Редактировать',
  'Название института',
  'Полное название',
  'Адрес',
  'Средний рейтинг',
  'Рейтинг предметов',
];

export const keys = ['id', 'name', 'name', 'name', 'rating', 'id'];

export const renderCels = [
  (text: string) => <LinkButton to={`/admin/institutes/edit/${text}`} text='Редактировать' width={240} />,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <LinkButton to={`/admin/courses/${text}`} text='Перейти' width={180} />
];
