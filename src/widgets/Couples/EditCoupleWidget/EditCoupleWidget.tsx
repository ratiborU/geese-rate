import { z } from 'zod';
import styles from './editCouplesWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICoupleResponse } from '../../../services/coupleService';
import Button from '../../../components/UI/Button/Button';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import Input from '../../../components/UI/Inputs/Input/Input';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../../providers/UserContextProvider/hooks/useUserContext';
import { useGetUsersOptionsQuery } from '../../../hooks/users/useGetUsersOptionsQuery';
import { useGetInstitutesOptionsQuery } from '../../../hooks/institutes/useGetInstitutesOptions';
import { useGetCoursesOptionsQuery } from '../../../hooks/courses/useGetCoursesOptions';
import { useUpdateCoupleMutation } from '../../../hooks/couples/useUpdateCoupleMutation';
import { useDeleteCoupleMutation } from '../../../hooks/couples/useDeleteCoupleMutation';

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
  const { user } = useUserContext();
  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit } = useForm<TCreateLessonSchema>({ resolver: zodResolver(createLessonSchema) });

  const { data: users, isFetching: usersIsLoading, error: usersError } = useGetUsersOptionsQuery(user?.role || 'teacher', Number(user?.id));
  const { data: institutes, isFetching: institutesIsLoading, error: institutesError } = useGetInstitutesOptionsQuery();
  const { data: courses, isFetching: coursesIsLoading, error: coursesError } = useGetCoursesOptionsQuery();

  const onSubmit = async (formData: TCreateLessonSchema) => {
    await updateCouple({ ...formData, id: data.id } as ICoupleResponse);
  }

  const onDelete = async () => {
    await deleteCouple(data.id);
  }

  const onSuccess = () => {
    notify("Пользователь успешно изменен!");
  }

  const onSuccessDelete = () => {
    notify("Пользователь успешно удален!");
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { isPending, updateCouple } = useUpdateCoupleMutation({ onSuccess, onError })
  const { isPending: isPendingDelete, deleteCouple } = useDeleteCoupleMutation({ onSuccess: onSuccessDelete, onError })

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
            type: "date",
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
            type: "time",
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
            isPending={isPending}
            buttonProps={{
              type: 'submit'
            }}
          />
          <Button
            text='Удалить'
            width={240}
            isPending={isPendingDelete}
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