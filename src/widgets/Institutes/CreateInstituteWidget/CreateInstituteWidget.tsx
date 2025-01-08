import { z } from 'zod';
import styles from './createInstituteWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import { InstituteService } from '../../../services/instituteService';
import Input from '../../../components/UI/Inputs/Input/Input';
import Button from '../../../components/UI/Button/Button';


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  rating: z.string()

})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const CreateInstituteWidget = () => {
  // const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (data: TCreateUserSchema) => {
    await InstituteService.create(data as unknown as TCreateUserSchema);
  }

  return (
    <div className={styles.block}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Название инстиута'
          inputProps={{
            id: 'create-institute-name',
            ...register('name'),
            type: "text",
            placeholder: 'Введите название института...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Полное название инстиута'
          inputProps={{
            id: 'create-institute-fullname',
            type: "text",
            placeholder: 'Введите полное название института...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Адрес инстиута'
          inputProps={{
            id: 'create-institute-address',
            type: "text",
            placeholder: 'Введите адрес института...',
            autoComplete: "new-password"
          }}
        />
        <input value={'0'} className={styles.inputNone} type="text" {...register('rating')} />
        <Button
          text='Создать'
          width={320}
          buttonProps={{
            type: 'submit'
          }}
        />
      </form>
      <img className={styles.image} src={people} alt="" />
    </div>
  );
};

export default CreateInstituteWidget;