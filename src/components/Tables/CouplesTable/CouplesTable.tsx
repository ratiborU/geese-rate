// import { IUserResponse } from '../../services/userService';
import styles from './couplesTable.module.css'
import CoursesTableRow from './CouplesTableRow';
import { NavLink } from 'react-router-dom';
// import { ICourseResponse } from '../../../services/courseService';
import { ICoupleResponse } from '../../../services/coupleService';

const CoursesTable = (props: { data: ICoupleResponse[]; }) => {
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
          <th className={styles.cell}>Преподаватель</th>
          <th className={styles.cell}>Дата</th>
          <th className={styles.cell}>Статус</th>
          <th className={styles.cell}>Ссылка QR</th>
        </tr>
      </thead>
      <tbody>
        {/* {...data.map(x => <CoursesTableRow key={x.id} row={x} />)} */}
        {...data.sort((a: ICoupleResponse, b: ICoupleResponse) => Number(a.id) - Number(b.id)).map(x => <CoursesTableRow key={x.id} row={x} />)}
      </tbody>
    </table>
  );
};

export default CoursesTable;