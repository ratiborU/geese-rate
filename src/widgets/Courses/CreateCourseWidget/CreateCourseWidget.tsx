import { z } from 'zod';
import styles from './createCourseWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseService } from '../../../services/courseService';
import Input from '../../../components/UI/Inputs/Input/Input';
import Button from '../../../components/UI/Button/Button';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../../services/userService';
import { InstituteService } from '../../../services/instituteService';
// import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  institute: z.string().min(1, "Это поле обязательно для заполнения"),
  teacher: z.string().min(1, "Это поле обязательно для заполнения"),
  schedule: z.string().min(1, "Это поле обязательно для заполнения")
})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const CreateCourseWidget = () => {
  // const { id } = useParams();
  const [searchParams] = useSearchParams();
  const notify = () => toast.success("Предмет успешно создан!");
  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

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

  const onSubmit = async (data: TCreateUserSchema) => {
    await CourseService.create(data as unknown as TCreateUserSchema);
    notify();
  }

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