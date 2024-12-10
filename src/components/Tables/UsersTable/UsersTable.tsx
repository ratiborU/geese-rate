import { IUserResponse } from '../../../services/userService';
import styles from './usersTable.module.css'
import UserRow from './UserRow';

const UsersTable = (props: { data: IUserResponse[]; }) => {
  const { data } = props;

  return (
    <table className={styles.block}>
      <thead className={styles.thead}>
        <tr className={styles.headerLine}>
          <th className={styles.headerCell}></th>
          <th className={styles.headerCell}>id</th>
          <th className={styles.headerCell}>Имя</th>
          <th className={styles.headerCell}>Фамилия</th>
          <th className={styles.headerCell}>Логин</th>
          <th className={styles.headerCell}>username</th>
          <th className={styles.headerCell}>роль</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {...data.sort((a: IUserResponse, b: IUserResponse) => Number(a.id) - Number(b.id)).map(x => <UserRow key={x.id} row={x} />)}
      </tbody>
    </table>
  );
};

export default UsersTable;