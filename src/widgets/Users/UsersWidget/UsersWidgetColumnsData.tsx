import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { IUserResponse } from "../../../services/userService";
export const tableName = 'Institutes';

export const headerLabels = [
  '',
  'Редактировать',
  'ФИО',
  'Логин',
  'Роль',
];

// export const keys = ['id', 'first_name', 'username', 'role'];

export const renderCels = [
  (item: IUserResponse) => <LinkButton to={`/admin/users/edit/${item.id}`} text='Редактировать' width={240} />,
  (item: IUserResponse) => <>{item.first_name}</>,
  (item: IUserResponse) => <>{item.username}</>,
  (item: IUserResponse) => <>{item.role}</>
];
