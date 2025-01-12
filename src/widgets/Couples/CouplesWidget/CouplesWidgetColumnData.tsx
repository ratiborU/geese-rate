import { useQuery } from "@tanstack/react-query";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { UserService } from "../../../services/userService";
import { InstituteService } from "../../../services/instituteService";
import { CourseService } from "../../../services/courseService";
import { ICoupleResponse } from "../../../services/coupleService";
import { parseDate } from "../../../lib/helpers/parseDate";

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
  'Время',
  'Средний рейтинг',
  'Отзывы',
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
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await CourseService.getOne(Number(item.course));
        return institute
      },
      queryKey: ["coursesData", item.course],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.name} </>
  },
  (item: ICoupleResponse) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await UserService.getOne(Number(item.teacher));
        return institute
      },
      queryKey: ["usersData", item.teacher],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.first_name} </>
  },
  (item: ICoupleResponse) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await InstituteService.getOne(Number(item.institute));
        return institute
      },
      queryKey: ["institutesData", item.institute],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.name}</>
  },

  (item: ICoupleResponse) => <>{item.address}</>,
  (item: ICoupleResponse) => <>{item.room}</>,
  (item: ICoupleResponse) => <>{parseDate(item.date)}</>,
  (item: ICoupleResponse) => <>{item.time}</>,
  (item: ICoupleResponse) => <>{Number(item.average_rating).toFixed(2)}</>,
  (item: ICoupleResponse) => <LinkButton to={`/admin/couples/review/${item.id}`} text='Перейти' width={180} />
];
