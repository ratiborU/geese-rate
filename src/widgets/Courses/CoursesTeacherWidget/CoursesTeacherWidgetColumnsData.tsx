// import { useQuery } from "@tanstack/react-query";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
// import { UserService } from "../../../services/userService";
// import { InstituteService } from "../../../services/instituteService";
import { ICourseResponse } from "../../../services/courseService";
import { useGetOneInstituteQuery } from "../../../hooks/institutes/useGetOneInstituteQuery";
import Loader from "../../../components/UI/Loader/Loader";
import { useGetOneUserQuery } from "../../../hooks/users/useGetOneUserQuery";

export const tableName = 'Institutes';

export const headerLabels = [
  '',
  'Редактировать',
  'Название',
  'Институт',
  'Преподаватель',
  'Расписание',
  'Пары предмета',
];

// export const keys = ['id', 'name', 'institute', 'teacher', 'schedule', 'id'];

export const renderCels = [
  (item: ICourseResponse) => <LinkButton to={`/admin/courses/edit/${item.id}`} text='Редактировать' width={240} />,
  (item: ICourseResponse) => <>{item.name}</>,
  (item: ICourseResponse) => {
    const { data, isFetching, error } = useGetOneInstituteQuery(Number(item.institute));

    if (isFetching) {
      return <Loader color={'#000000'} />
    }

    if (error) {
      return '-'
    }

    return <>{data?.name}</>
  },
  (item: ICourseResponse) => {
    const { data, isFetching, error } = useGetOneUserQuery(Number(item.teacher));

    if (isFetching) {
      return <Loader color={'#000000'} />
    }

    if (error) {
      return '-'
    }

    return <>{data?.first_name} </>
  },
  (item: ICourseResponse) => <>{item.schedule}</>,
  (item: ICourseResponse) => <LinkButton to={`/admin/couples/${item.id}?institute=${item.institute}&teacher=${item.teacher}`} text='Перейти' width={180} />
];
