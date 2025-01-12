// import { IUserResponse } from '../../services/userService';
import styles from './couplesTable.module.css'
// import Couples from './CouplesTableRow';
import CouplesReviewListTableRow from './CouplesReviewListTableRow';
import { NavLink } from 'react-router-dom';
// import { ICourseResponse } from '../../../services/courseService';
import { ICoupleResponse } from '../../../services/coupleService';

const CouplesReviewListTable = (props: { data: ICoupleResponse[]; }) => {
  const { data } = props;

  return (
    <table className={styles.block}>
      <thead>
        <tr>
          <th className={styles.cell}>
            <NavLink className={styles.link} to={`/admin/couples/create`}>Добавить</NavLink>
          </th>
          <th className={styles.cell}>id</th>
          <th className={styles.cell}>ФИО</th>
          <th className={styles.cell}>Оценка</th>
          <th className={styles.cell}>Отзыв</th>
        </tr>
      </thead>
      <tbody>
        {/* {...data.map(x => <CoursesTableRow key={x.id} row={x} />)} */}
        {...data.sort((a: ICoupleResponse, b: ICoupleResponse) => Number(a.id) - Number(b.id)).map(x => <CouplesReviewListTableRow key={x.id} row={x} />)}
      </tbody>
    </table>
  );
};

export default CouplesReviewListTable;