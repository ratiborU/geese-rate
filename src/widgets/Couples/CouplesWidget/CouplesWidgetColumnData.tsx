import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { ICoupleResponse } from "../../../services/coupleService";
import { parseDate } from "../../../lib/helpers/parseDate";
import { useGetOneCourseQuery } from "../../../hooks/courses/useGetOneCourseQuery";
import Loader from "../../../components/UI/Loader/Loader";
import { useGetOneUserQuery } from "../../../hooks/users/useGetOneUserQuery";
import { useGetOneInstituteQuery } from "../../../hooks/institutes/useGetOneInstituteQuery";

export const tableName = 'Lessons';

export const headerLabels = [
  '',
  'Редактировать',
  'Тема',
  'Предмет',
  'Преподаватель',
  'Институт',
  'Адрес',
  'Аудитория',
  'Дата',
  // 'Время',
  'Средний рейтинг',
  'Отзывы',
  'Статистика',
];

export const keys = [
  'id',
  'topic',
  'course',
  'teacher',
  'institute',
  'address',
  'room',
  'date',
  'time',
  'average_rating',
  'id'
];

export const renderCels = [
  (item: ICoupleResponse) => <LinkButton to={`/admin/couples/edit/${item.id}`} text='Редактировать' width={240} />,
  (item: ICoupleResponse) => <>{item.topic}</>,
  (item: ICoupleResponse) => {
    const { data, isFetching, error } = useGetOneCourseQuery(Number(item.course));

    if (isFetching) {
      return <Loader color={'#000000'} />
    }

    if (error) {
      return '-'
    }

    return <>{data?.name} </>
  },
  (item: ICoupleResponse) => {
    const { data, isFetching, error } = useGetOneUserQuery(Number(item.teacher));
    if (isFetching) {
      return <Loader color={'#000000'} />
    }
    if (error) {
      return '-'
    }
    return <>{data?.first_name}</>
  },
  (item: ICoupleResponse) => {
    const { data, isFetching, error } = useGetOneInstituteQuery(Number(item.institute));
    if (isFetching) {
      return <Loader color={'#000000'} />
    }
    if (error) {
      return '-'
    }
    return <>{data?.name}</>
  },

  (item: ICoupleResponse) => <>{item.address}</>,
  (item: ICoupleResponse) => <>{item.room}</>,
  (item: ICoupleResponse) => <>{parseDate(item.date)}, {item.time}</>,
  // (item: ICoupleResponse) => <>{item.time}</>,
  (item: ICoupleResponse) => <>{Number(item.average_rating).toFixed(2)}</>,
  (item: ICoupleResponse) => <LinkButton to={`/admin/couples/review/${item.id}`} text='Перейти' width={180} />,
  (item: ICoupleResponse) => <LinkButton to={`/admin/couples/statistics/${item.id}?course=${item.course}`} text='Перейти' width={180} />
];
