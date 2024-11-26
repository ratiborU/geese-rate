// import { IInstituteResponse } from '../../services/instituteService';
import { IInstituteResponse } from '../../../services/instituteService';
import styles from './institutesTable.module.css'
import { NavLink } from 'react-router-dom';

const InstitutesTableRow = (props: { row: IInstituteResponse; }) => {
  const { row } = props;

  return (
    <tr>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/institutes/edit/${row.id}`} >Редактировать</NavLink>
      </th>
      <th className={styles.cell}>{row.id}</th>
      <th className={styles.cell}>{row.name}</th>
      <th className={styles.cell}>{row.rating}</th>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/courses/${row.id}`} >Перейти к рейтингу</NavLink>
      </th>
    </tr>
  );
};

export default InstitutesTableRow;