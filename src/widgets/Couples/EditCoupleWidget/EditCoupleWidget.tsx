import { z } from 'zod';
import styles from './editCouplesWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseService } from '../../../services/courseService';
import { CoupleService, ICoupleResponse } from '../../../services/coupleService';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../../services/userService';
import { InstituteService } from '../../../services/instituteService';
import Button from '../../../components/UI/Button/Button';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import Input from '../../../components/UI/Inputs/Input/Input';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const EditCouplesWidget = (props: { data: ICoupleResponse; }) => {
  const { data } = props;
  const notify = () => toast.success("Пара успешно изменена!");
  const notifyDelete = () => toast.success("Пара успешно удалена!");
  const { register, handleSubmit } = useForm<TCreateLessonSchema>({ resolver: zodResolver(createLessonSchema) });

  const { data: users, isLoading: usersIsLoading, error: usersError } = useQuery({
    queryFn: async () => {
      const users = await UserService.getAll()
      return users.map(x => ({ value: x.id, text: x.first_name }));
    },
    queryKey: ["userOptions"],
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

  const onDelete = async () => {
    await CoupleService.delete(Number(data.id));
    notifyDelete();
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
            autoComplete: "new-password",
            defaultValue: data.topic,
          }}
        />
        <Input
          label='Адрес'
          inputProps={{
            id: 'create-course-name',
            ...register('address'),
            type: "text",
            placeholder: 'Введите адрес...',
            autoComplete: "new-password",
            defaultValue: data.address,
          }}
        />
        <Input
          label='Аудитория'
          inputProps={{
            id: 'create-course-name',
            ...register('room'),
            type: "text",
            placeholder: 'Введите аудиторию...',
            autoComplete: "new-password",
            defaultValue: data.room,
          }}
        />
        <Input
          label='Дата'
          inputProps={{
            id: 'create-course-name',
            ...register('date'),
            type: "text",
            placeholder: 'Введите дату 2025-01-20...',
            autoComplete: "new-password",
            defaultValue: data.date,
          }}
        />
        <Input
          label='Время'
          inputProps={{
            id: 'create-course-name',
            ...register('time'),
            type: "text",
            placeholder: 'Введите время 12:00:00...',
            autoComplete: "new-password",
            defaultValue: data.time
          }}
        />
        <SelectInput
          label='Институт'
          text='Выберите институт...'
          selectProps={{
            ...register('institute'),
            defaultValue: data.institute,
          }}
          options={institutes}
        />
        <SelectInput
          label='Предмет'
          text='Выберите предмет...'
          selectProps={{
            ...register('course'),
            defaultValue: data.course,
          }}
          options={courses}
        />
        <SelectInput
          label='Преподаватель'
          text='Выберите преподавателя...'
          selectProps={{
            ...register('teacher'),
            defaultValue: data.teacher,
          }}
          options={users}
        />
        <div className={styles.buttons}>
          <Button
            text='Сохранить'
            width={240}
            buttonProps={{
              type: 'submit'
            }}
          />
          <Button
            text='Удалить'
            width={240}
            buttonProps={{
              type: 'button',
              onClick: onDelete
            }}
          />
        </div>
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

export default EditCouplesWidget;