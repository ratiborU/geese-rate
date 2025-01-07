import { useQuery } from "@tanstack/react-query";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { UserService } from "../../../services/userService";
import { InstituteService } from "../../../services/instituteService";

export const tableName = 'Institutes';

export const headerLabels = [
  '',
  'Редактировать',
  'Название',
  'Институт',
  'Преподаватель',
  'Расписание',
  // 'Рейтинг преподавателя',
  'Рейтинг предмета',
];

export const keys = ['id', 'name', 'institute', 'teacher', 'schedule', 'id'];

export const renderCels = [
  (text: string) => <LinkButton to={`/admin/courses/edit/${text}`} text='Редактировать' width={240} />,
  (text: string) => <>{text}</>,
  (text: string) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await InstituteService.getOne(Number(text));
        return institute
      },
      queryKey: ["coursesDatasdsd"],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.name}</>
  },
  (text: string) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await UserService.getOne(Number(text));
        return institute
      },
      queryKey: ["coursesData"],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.last_name} {data?.first_name} </>
  },
  (text: string) => <>{text}</>,
  // (text: string) => <>{text}</>,
  // (text: string) => <LinkButton to={`/admin/courses/teacher/${text}`} text='Перейти' width={180} />,
  (text: string) => <LinkButton to={`/admin/couples/${text}`} text='Перейти' width={180} />
];
