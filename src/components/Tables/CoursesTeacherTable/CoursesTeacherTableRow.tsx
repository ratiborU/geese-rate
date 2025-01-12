// import { IInstituteResponse } from '../../services/instituteService';
import { ICourseResponse } from '../../../services/courseService';
import styles from './coursesTeacherTable.module.css'
import { NavLink } from 'react-router-dom';
// import { CourseService } from '../../../services/courseService';
import { UserService } from '../../../services/userService';
import { InstituteService } from '../../../services/instituteService';
import { useQuery } from '@tanstack/react-query';

const CoursesTeacherTableRow = (props: { row: ICourseResponse; }) => {
  const { row } = props;

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const user = await UserService.getOne(Number(row.teacher));
      const institute = await InstituteService.getOne(Number(row.institute));
      return { user, institute }

    },
    queryKey: ["coursesData", row.teacher, row.institute],
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
        <NavLink className={styles.link} to={`/admin/courses/edit/${row.id}`} >Редактировать</NavLink>
      </th>
      <th className={styles.cell}>{row.id}</th>
      <th className={styles.cell}>{row.name}</th>
      <th className={styles.cell}>{data.institute.name}</th>
      <th className={styles.cell}>{data.user.first_name} {data.user.last_name}</th>
      <th className={styles.cell}>{row.schedule}</th>
      <th className={styles.cell}>
        <NavLink className={styles.link} to={`/admin/couples/${row.id}`} >Перейти</NavLink>
      </th>
    </tr>
  );
};

export default CoursesTeacherTableRow;