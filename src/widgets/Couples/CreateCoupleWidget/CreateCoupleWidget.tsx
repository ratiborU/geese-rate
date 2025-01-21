import { z } from 'zod';
import styles from './createCouplesWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/UI/Inputs/Input/Input';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import Button from '../../../components/UI/Button/Button';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import { useSearchParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../../providers/UserContextProvider/hooks/useUserContext';
import { useGetUsersOptionsQuery } from '../../../hooks/users/useGetUsersOptionsQuery';
import { useGetInstitutesOptionsQuery } from '../../../hooks/institutes/useGetInstitutesOptions';
import { useGetCoursesOptionsQuery } from '../../../hooks/courses/useGetCoursesOptions';
import { useCreateCoupleMutation } from '../../../hooks/couples/useCreateCoupleMutation';


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
  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit } = useForm<TCreateLessonSchema>({ resolver: zodResolver(createLessonSchema) });

  const { data: users, isFetching: usersIsLoading, error: usersError } = useGetUsersOptionsQuery(user?.role || 'teacher', Number(user?.id));
  const { data: institutes, isFetching: institutesIsLoading, error: institutesError } = useGetInstitutesOptionsQuery();
  const { data: courses, isFetching: coursesIsLoading, error: coursesError } = useGetCoursesOptionsQuery();

  const onSubmit = async (data: TCreateLessonSchema) => {
    await createCouple(data);
  }

  const onSuccess = () => {
    notify("Предмет успешно создан!");
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { isPending, createCouple } = useCreateCoupleMutation({ onSuccess, onError })

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
          isPending={isPending}
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