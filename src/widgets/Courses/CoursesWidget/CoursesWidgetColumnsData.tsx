import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { ICourseResponse } from "../../../services/courseService";
import { useGetOneUserQuery } from "../../../hooks/users/useGetOneUserQuery";
import Loader from "../../../components/UI/Loader/Loader";
import { useGetOneInstituteQuery } from "../../../hooks/institutes/useGetOneInstituteQuery";

export const tableName = 'Institutes';

export const headerLabels = [
  '',
  'Редактировать',
  'Название',
  'Институт',
  'Преподаватель',
  'Расписание',
  'Рейтинг преподавателя',
  'Пары предмета',
];

// export const keys = ['id', 'name', 'institute', 'teacher', 'schedule', 'teacher', 'id'];

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
    return <>{data?.first_name}</>
  },
  (item: ICourseResponse) => <>{item.schedule}</>,
  (item: ICourseResponse) => <LinkButton to={`/admin/courses/teacher/${item.teacher}?institute=${item.institute}`} text='Перейти' width={180} />,
  (item: ICourseResponse) => <LinkButton to={`/admin/couples/${item.id}?institute=${item.institute}`} text='Перейти' width={180} />
];
