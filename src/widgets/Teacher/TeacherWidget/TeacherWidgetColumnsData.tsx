import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { ICourseResponse } from "../../../services/courseService";
import { useGetOneInstituteQuery } from "../../../hooks/institutes/useGetOneInstituteQuery";
import { useGetOneUserQuery } from "../../../hooks/users/useGetOneUserQuery";
import Loader from "../../../components/UI/Loader/Loader";

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
  (item: ICourseResponse) => <LinkButton to={`/teacher/couples/${item.id}`} text='Перейти' width={180} />
];
