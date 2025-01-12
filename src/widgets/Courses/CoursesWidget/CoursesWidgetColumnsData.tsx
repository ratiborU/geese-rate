import { useQuery } from "@tanstack/react-query";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { UserService } from "../../../services/userService";
import { InstituteService } from "../../../services/instituteService";
import { ICourseResponse } from "../../../services/courseService";

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
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await InstituteService.getOne(Number(item.institute));
        return institute
      },
      queryKey: ["institute", item.institute],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.name}</>
  },
  (item: ICourseResponse) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await UserService.getOne(Number(item.teacher));
        return institute
      },
      queryKey: ["user", item.teacher],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.first_name} </>
  },
  (item: ICourseResponse) => <>{item.schedule}</>,
  (item: ICourseResponse) => <LinkButton to={`/admin/courses/teacher/${item.teacher}?institute=${item.institute}`} text='Перейти' width={180} />,
  (item: ICourseResponse) => <LinkButton to={`/admin/couples/${item.id}?institute=${item.institute}`} text='Перейти' width={180} />
];
