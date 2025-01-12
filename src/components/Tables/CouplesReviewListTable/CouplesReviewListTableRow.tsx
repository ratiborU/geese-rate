// import { IInstituteResponse } from '../../services/instituteService';
// import { ICourseResponse } from '../../../services/courseService';
import styles from './couplesReviewListTable.module.css'
import { NavLink } from 'react-router-dom';
// import { CourseService } from '../../../services/courseService';
import { UserService } from '../../../services/userService';
// import { InstituteService } from '../../../services/instituteService';
import { useQuery } from '@tanstack/react-query';
import { ICoupleResponse } from '../../../services/coupleService';
import { CourseService } from '../../../services/courseService';

const CouplesReviewListTableRow = (props: { row: ICoupleResponse; }) => {
  const { row } = props;

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const course = await CourseService.getOne(Number(row.course));
      const user = await UserService.getOne(Number(row.teacher));
      // const institute = await InstituteService.getOne(Number(row.institute));
      return { course, user }
    },
    queryKey: ["coupleRow", row.course, row.teacher],
    // staleTime: Infinity,
  });

  if (isLoading || !data) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <tr>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/couples/edit/${row.id}`} >Редактировать</NavLink>
      </th>
      <th className={styles.cell}>{row.id}</th>
      <th className={styles.cell}>{data.course.name}</th>
      <th className={styles.cell}>{data.user.first_name} {data.user.last_name}</th>
      <th className={styles.cell}>{row.date}</th>
    </tr>
  );
};

export default CouplesReviewListTableRow;