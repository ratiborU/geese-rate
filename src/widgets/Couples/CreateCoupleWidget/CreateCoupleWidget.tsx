import { z } from 'zod';
import styles from './createCouplesWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CoupleService } from '../../../services/coupleService';
import Input from '../../../components/UI/Inputs/Input/Input';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../../services/userService';
import { InstituteService } from '../../../services/instituteService';
import Button from '../../../components/UI/Button/Button';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import { CourseService } from '../../../services/courseService';
import { useSearchParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { LocalStorageService } from '../../../lib/helpers/localStorageService';
import { useUserContext } from '../../../providers/UserContextProvider/hooks/useUserContext';


const createLessonSchema = z.object({
  institute: z.string().min(1, "Это поле обязательно для заполнения"),
  course: z.string().min(1, "Это поле обязательно для заполнения"),
  teacher: z.string().min(1, "Это поле обязательно для заполнения"),
  topic: z.string().min(1, "Это поле обязательно для заполнения"),
  address: z.string().min(1, "Это поле обязательно для заполнения"),
  room: z.string().min(1, "Это поле обязательно для заполнения"),
  date: z.string().min(1, "Это поле обязательно для заполнения"),
  time: z.string().min(1, "Это поле обязательно для заполнения"),
})

type TCreateLessonSchema = z.infer<typeof createLessonSchema>;

const CreateCouplesWidget = () => {
  const [searchParams] = useSearchParams();
  const { user } = useUserContext();
  const notify = () => toast.success("Пара успешно создана!");
  const { register, handleSubmit } = useForm<TCreateLessonSchema>({ resolver: zodResolver(createLessonSchema) });

  const { data: users, isLoading: usersIsLoading, error: usersError } = useQuery({
    queryFn: async () => {
      if (user?.role == 'teacher') {
        const users = await UserService.getOne(Number(user.id));
        return [{ value: users.id, text: users.first_name }];
      }
      const users = await UserService.getAll()
      return users.filter(x => x.role != 'admin').map(x => ({ value: x.id, text: x.first_name }));
    },
    queryKey: ["userOptions", user],
    staleTime: Infinity,
  });

  const { data: institutes, isLoading: institutesIsLoading, error: institutesError } = useQuery({
    queryFn: async () => {
      const users = await InstituteService.getAll()
      return users.map(x => ({ value: x.id, text: x.name }));
    },
    queryKey: ["instituteOptions"],
    staleTime: Infinity,
  });

  const { data: courses, isLoading: coursesIsLoading, error: coursesError } = useQuery({
    queryFn: async () => {
      const users = await CourseService.getAll()
      return users.map(x => ({ value: x.id, text: x.name }));
    },
    queryKey: ["courseOptions"],
    staleTime: Infinity,
  });

  const onSubmit = async (data: TCreateLessonSchema) => {
    await CoupleService.create(data as unknown as TCreateLessonSchema);
    notify();
  }

  if (usersIsLoading || institutesIsLoading || coursesIsLoading) {
    return <>Загрузка...</>
  }

  if (usersError || institutesError || coursesError || !users || !institutes || !courses) {
    return <>Произошла ошибка</>
  }

  return (
    <div className={styles.block}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Тема пары'
          inputProps={{
            id: 'create-course-name',
            ...register('topic'),
            type: "text",
            placeholder: 'Введите название предмета...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Адрес'
          inputProps={{
            id: 'create-course-name',
            ...register('address'),
            type: "text",
            placeholder: 'Введите адрес...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Аудитория'
          inputProps={{
            id: 'create-course-name',
            ...register('room'),
            type: "text",
            placeholder: 'Введите аудиторию...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Дата'
          inputProps={{
            id: 'create-course-name',
            ...register('date'),
            type: "date",
            placeholder: 'Введите дату 2025-01-20...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Время'
          inputProps={{
            id: 'create-course-name',
            ...register('time'),
            type: "time",
            placeholder: 'Введите время 12:00:00...',
            autoComplete: "new-password"
          }}
        />
        <SelectInput
          label='Институт'
          text='Выберите институт...'
          selectProps={{
            ...register('institute'),
            defaultValue: searchParams.get('institute') || ''
          }}
          options={institutes}
        />
        <SelectInput
          label='Предмет'
          text='Выберите предмет...'
          selectProps={{
            ...register('course'),
            defaultValue: searchParams.get('course') || ''
          }}
          options={courses}
        />
        <SelectInput
          label='Преподаватель'
          text='Выберите преподавателя...'
          selectProps={{
            ...register('teacher'),
            defaultValue: searchParams.get('teacher') || ''
          }}
          options={users}
        />
        <Button
          text='Создать'
          width={320}
          buttonProps={{
            type: 'submit'
          }}
        />
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={8}
      />
      <img className={styles.image} src={people} alt="" />
    </div>
  );
};

export default CreateCouplesWidget;