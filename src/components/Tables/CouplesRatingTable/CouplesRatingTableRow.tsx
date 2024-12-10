import styles from './couplesRatingTable.module.css'
import { NavLink } from 'react-router-dom';
import { UserService } from '../../../services/userService';
import { useQuery } from '@tanstack/react-query';
import { ICoupleResponse } from '../../../services/coupleService';
import { CourseService } from '../../../services/courseService';


const CoursesRatingTableRow = (props: { row: ICoupleResponse; }) => {
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
      {/* <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/courses/edit/${row.id}`} >Редактировать</NavLink>
      </th> */}
      <th className={styles.cell}>{row.id}</th>
      <th className={styles.cell}>{data.course.name}</th>
      <th className={styles.cell}>{data.user.first_name} {data.user.last_name}</th>
      <th className={styles.cell}>{row.date}</th>
      <th className={styles.cell}>{5}</th>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/couples/review/${row.id}`} >К рейтингу</NavLink>
      </th>
    </tr>
  );
};

export default CoursesRatingTableRow;