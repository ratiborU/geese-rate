import styles from './loginModal.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import keyVisual from '../../assets/KeyVisual.png'
import { AuthService } from '../../services/authService';

const loginSchema = z.object({
  username: z.string().min(1, "Это поле обязательно для заполнения"),
  password: z.string().min(1, "Это поле обязательно для заполнения"),
});

type TLoginSchema = z.infer<typeof loginSchema>;

const LoginModal = (props: { isVisible: boolean; change: (state: boolean) => void; }) => {
  const { isVisible, change } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: TLoginSchema) => {
    await AuthService.login(data);
    navigate('/admin', { state: { from: location }, replace: true });
  }

  if (!isVisible) {
    return <></>
  }

  return (
    <>
      <div className={styles.backGround} onClick={() => change(false)}></div>
      <div className={styles.block}>
        <div className={styles.modal}>
          <h2 className={styles.title}>Вход</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              className={styles.input}
              {...register('username')}
              type="text"
              placeholder='Логин'
            />
            <input
              className={styles.input}
              {...register('password')}
              type="text"
              placeholder='Пароль'
            />
            <button className={styles.button} type='submit'>Войти</button>
          </form>
        </div>

        <img src={keyVisual} alt="" />
      </div>

    </>

  );
};

export default LoginModal;