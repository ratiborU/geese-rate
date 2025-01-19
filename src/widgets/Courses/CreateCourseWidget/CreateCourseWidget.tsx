import { z } from 'zod';
import styles from './createCourseWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/UI/Inputs/Input/Input';
import Button from '../../../components/UI/Button/Button';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../../providers/UserContextProvider/hooks/useUserContext';
import { useGetUsersOptionsQuery } from '../../../hooks/users/useGetUsersOptionsQuery';
import { useGetInstitutesOptionsQuery } from '../../../hooks/institutes/useGetInstitutesOptions';
import { useCreateCourseMutation } from '../../../hooks/courses/useCreateCourseMutation';


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  institute: z.string().min(1, "Это поле обязательно для заполнения"),
  teacher: z.string().min(1, "Это поле обязательно для заполнения"),
  schedule: z.string().min(1, "Это поле обязательно для заполнения")
})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const CreateCourseWidget = () => {
  const [searchParams] = useSearchParams();
  const { user } = useUserContext();
  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const { data: users, isFetching: usersIsLoading, error: usersError } = useGetUsersOptionsQuery(user?.role || 'teacher', Number(user?.id));
  const { data: institutes, isFetching: institutesIsLoading, error: institutesError } = useGetInstitutesOptionsQuery();


  const onSubmit = async (data: TCreateUserSchema) => {
    await createCourse(data);
  }

  const onSuccess = () => {
    notify("Предмет успешно создан!");
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { isPending, createCourse } = useCreateCourseMutation({ onSuccess, onError })

  if (usersIsLoading || institutesIsLoading) {
    return <>Загрузка...</>
  }

  if (usersError || institutesError || !users || !institutes) {
    return <>Произошла ошибка</>
  }

  return (
    <div className={styles.block}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Название предмета'
          inputProps={{
            id: 'create-course-name',
            ...register('name'),
            type: "text",
            placeholder: 'Введите название предмета...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Расписание'
          inputProps={{
            id: 'create-course-schedule',
            ...register('schedule'),
            type: "text",
            placeholder: 'Вторник 14:30; Четверг 10:15',
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

export default CreateCourseWidget;