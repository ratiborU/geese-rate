import { z } from 'zod';
import styles from './editCourseWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICourseResponse, CourseService } from '../../../services/courseService';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../../services/userService';
import { InstituteService } from '../../../services/instituteService';
import Input from '../../../components/UI/Inputs/Input/Input';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import Button from '../../../components/UI/Button/Button';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  institute: z.string().min(1, "Это поле обязательно для заполнения"),
  teacher: z.string().min(1, "Это поле обязательно для заполнения"),
  schedule: z.string().min(1, "Это поле обязательно для заполнения")
})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const EditCourseWidget = (props: { data: ICourseResponse; }) => {
  const { data } = props;
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

  const onSubmit = async (formData: TCreateUserSchema) => {
    await CourseService.update(data.id, formData as unknown as TCreateUserSchema);
  }

  const onDelete = async () => {
    await CourseService.delete(Number(data.id));
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
            autoComplete: "new-password",
            defaultValue: data.name
          }}
        />
        <Input
          label='Расписание'
          inputProps={{
            id: 'create-course-schedule',
            ...register('schedule'),
            type: "text",
            placeholder: 'Вторник 14:30; Четверг 10:15',
            autoComplete: "new-password",
            defaultValue: data.schedule
          }}
        />
        <SelectInput
          label='Институт'
          text='Выберите институт...'
          selectProps={{
            ...register('institute'),
            defaultValue: data.institute
          }}
          options={institutes}
        />
        <SelectInput
          label='Преподаватель'
          text='Выберите преподавателя...'
          selectProps={{
            ...register('teacher'),
            defaultValue: data.teacher
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
      <img className={styles.image} src={people} alt="" />
    </div>
  );
};

export default EditCourseWidget;