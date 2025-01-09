import LinkButton from "../../../components/UI/LinkButton/LinkButton";

export const tableName = 'Institutes';

export const headerLabels = [
  '',
  'Редактировать',
  'ФИО',
  'Логин',
  'Роль',
];

export const keys = ['id', 'first_name', 'username', 'role'];

export const renderCels = [
  (text: string) => <LinkButton to={`/admin/users/edit/${text}`} text='Редактировать' width={240} />,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>
];
