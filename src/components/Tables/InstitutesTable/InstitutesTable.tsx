// import { IUserResponse } from '../../services/userService';
import styles from './institutesTable.module.css'
import InstitutesTableRow from './InstitutesTableRow';
import { IInstituteResponse } from '../../../services/instituteService';
import { NavLink } from 'react-router-dom';

const InstitutesTable = (props: { data: IInstituteResponse[]; }) => {
  const { data } = props;

  return (
    <table className={styles.block}>
      <thead>
        <tr>
          <th className={styles.cell}>
            <NavLink className={styles.link} to={`/admin/institutes/create`}>Добавить</NavLink>
          </th>
          <th className={styles.cell}>id</th>
          <th className={styles.cell}>Название</th>
          <th className={styles.cell}>Рейтинг</th>
          <th className={styles.cell}>Рейтинг предметов</th>
        </tr>
      </thead>
      <tbody>
        {...data.sort((a: IInstituteResponse, b: IInstituteResponse) => Number(a.id) - Number(b.id)).map(x => <InstitutesTableRow key={x.id} row={x} />)}
      </tbody>
    </table>
  );
};

export default InstitutesTable;