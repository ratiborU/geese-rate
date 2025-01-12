import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { IInstituteResponse } from "../../../services/instituteService";

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

// export const keys = ['id', 'name', 'name', 'name', 'rating', 'id'];

export const renderCels = [
  (item: IInstituteResponse) => <LinkButton to={`/admin/institutes/edit/${item.id}`} text='Редактировать' width={240} />,
  (item: IInstituteResponse) => <>{item.name}</>,
  (item: IInstituteResponse) => <>{item.name}</>,
  (item: IInstituteResponse) => <>{item.name}</>,
  (item: IInstituteResponse) => <>{item.rating}</>,
  (item: IInstituteResponse) => <LinkButton to={`/admin/courses/${item.id}`} text='Перейти' width={180} />
];
