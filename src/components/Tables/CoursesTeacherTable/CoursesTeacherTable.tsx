// import { IUserResponse } from '../../services/userService';
import styles from './coursesTeacherTable.module.css'
import CoursesTableRow from './CoursesTeacherTableRow';
import { NavLink } from 'react-router-dom';
import { ICourseResponse } from '../../../services/courseService';

const CoursesTable = (props: { data: ICourseResponse[]; }) => {
  const { data } = props;

  return (
    <table className={styles.block}>
      <thead>
        <tr>
          <th className={styles.cell}>
            <NavLink className={styles.link} to={`/admin/courses/create`}>Добавить</NavLink>
          </th>
          <th className={styles.cell}>id</th>
          <th className={styles.cell}>Название</th>
          <th className={styles.cell}>Институт</th>
          <th className={styles.cell}>Преподаватель</th>
          <th className={styles.cell}>Расписание</th>
          <th className={styles.cell}>Рейтинг предмета</th>
        </tr>
      </thead>
      <tbody>
        {/* {...data.map(x => <CoursesTableRow key={x.id} row={x} />)} */}
        {...data.sort((a: ICourseResponse, b: ICourseResponse) => Number(a.id) - Number(b.id)).map(x => <CoursesTableRow key={x.id} row={x} />)}
      </tbody>
    </table>
  );
};

export default CoursesTable;