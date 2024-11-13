import { IUserResponse } from '../../services/userService';
import styles from './usersTable.module.css'
import { NavLink } from 'react-router-dom';

const UserRow = (props: { row: IUserResponse; }) => {
  const { row } = props;

  return (
    <tr className={styles.line}>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/users/${row.id}`} >Редактировать</NavLink>
      </th>
      <th className={styles.cell}>{row.id}</th>
      <th className={styles.cell}>{row.first_name}</th>
      <th className={styles.cell}>{row.last_name}</th>
      <th className={styles.cell}>{row.email}</th>
      <th className={styles.cell}>{row.username}</th>
      <th className={styles.cell}>{row.role}</th>
    </tr>
  );
};

export default UserRow;