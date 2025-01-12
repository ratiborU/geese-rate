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
  'Пары предмета',
];

// export const keys = ['id', 'name', 'institute', 'teacher', 'schedule', 'id'];

export const renderCels = [
  (item: ICourseResponse) => <LinkButton to={`/admin/courses/edit/${item.id}`} text='Редактировать' width={240} />,
  (item: ICourseResponse) => <>{item.name}</>,
  (item: ICourseResponse) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await InstituteService.getOne(Number(item.institute));
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
  (item: ICourseResponse) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await UserService.getOne(Number(item.teacher));
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
    return <>{data?.first_name} </>
  },
  (item: ICourseResponse) => <>{item.schedule}</>,
  (item: ICourseResponse) => <LinkButton to={`/teacher/couples/${item.id}`} text='Перейти' width={180} />
];
