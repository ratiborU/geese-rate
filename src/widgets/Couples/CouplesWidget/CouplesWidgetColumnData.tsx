import { useQuery } from "@tanstack/react-query";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { UserService } from "../../../services/userService";
import { InstituteService } from "../../../services/instituteService";
import { CourseService } from "../../../services/courseService";

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
  (text: string) => <LinkButton to={`/admin/couples/edit/${text}`} text='Редактировать' width={240} />,
  (text: string) => <>{text}</>,
  (text: string) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await CourseService.getOne(Number(text));
        return institute
      },
      queryKey: ["coursesData", text],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.name} </>
  },
  (text: string) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await UserService.getOne(Number(text));
        return institute
      },
      queryKey: ["usersData", text],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.first_name} </>
  },
  (text: string) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await InstituteService.getOne(Number(text));
        return institute
      },
      queryKey: ["institutesData", text],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.name}</>
  },

  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <LinkButton to={`/admin/couples/review/${text}`} text='Перейти' width={180} />
];
