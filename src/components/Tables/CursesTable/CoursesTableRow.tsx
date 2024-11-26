// import { IInstituteResponse } from '../../services/instituteService';
import { ICourseResponse } from '../../../services/courseService';
import styles from './coursesTable.module.css'
import { NavLink } from 'react-router-dom';

const CoursesTableRow = (props: { row: ICourseResponse; }) => {
  const { row } = props;

  return (
    <tr>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/courses/edit/${row.id}`} >Редактировать</NavLink>
      </th>
      <th className={styles.cell}>{row.id}</th>
      <th className={styles.cell}>{row.name}</th>
      <th className={styles.cell}>{row.institute}</th>
      <th className={styles.cell}>{row.teacher}</th>
      <th className={styles.cell}>{row.schedule}</th>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/courses/${row.id}`} >Перейти к рейтингу</NavLink>
      </th>
    </tr>
  );
};

export default CoursesTableRow;