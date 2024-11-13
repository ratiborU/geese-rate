import { IUserResponse } from '../../services/userService';
import styles from './usersTable.module.css'
import UserRow from './UserRow';

const UsersTable = (props: { data: IUserResponse[]; }) => {
  const { data } = props;

  return (
    <table className={styles.block}>
      <thead>
        <tr className={styles.line}>
          <th className={styles.cell}></th>
          <th className={styles.cell}>id</th>
          <th className={styles.cell}>Имя</th>
          <th className={styles.cell}>Фамилия</th>
          <th className={styles.cell}>Логин</th>
          <th className={styles.cell}>username</th>
          <th className={styles.cell}>роль</th>
        </tr>
      </thead>
      <tbody>
        {...data.sort((a: IUserResponse, b: IUserResponse) => Number(a.id) - Number(b.id)).map(x => <UserRow key={x.id} row={x} />)}
      </tbody>
    </table>
  );
};

export default UsersTable;