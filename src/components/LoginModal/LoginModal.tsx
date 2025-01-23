import styles from './loginModal.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import keyVisual from '../../assets/KeyVisual.png'
import { UserService } from '../../services/userService';
import { LocalStorageService } from '../../lib/helpers/localStorageService';
import { useAuthSetterContext } from '../../providers/AuthContextProvider/hooks/useAuthSetterContext';
import { useUserSetterContext } from '../../providers/UserContextProvider/hooks/useUserSetterContext';
import { useLoginMutation } from '../../hooks/useLoginMutation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../UI/Button/Button';


const loginSchema = z.object({
  username: z.string().min(1, "Это поле обязательно для заполнения"),
  password: z.string().min(1, "Это поле обязательно для заполнения"),
});

type TLoginSchema = z.infer<typeof loginSchema>;

const LoginModal = (props: { isVisible: boolean; change: (state: boolean) => void; }) => {
  const { isVisible, change } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthSetterContext();
  const setUser = useUserSetterContext()
  const { register, handleSubmit } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  // const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const onSubmit = async (data: TLoginSchema) => {
    await login(data)
    // await AuthService.login(data);
    // 3.14 here
    // просто ужас, страхолюдина, 
    // уничтожить при первой же возможности
    const users = await UserService.getAll();
    const user = users.filter(x => x.username == data.username)[0];
    LocalStorageService.save('user', user)
    if (user.role == 'admin') {
      setAuth.setIsAuth(true);
      setAuth.setRole('admin');
      setUser.setUser(user);
      change(false)
      navigate('/admin', { state: { from: location }, replace: true });
    }
    if (user.role == 'teacher') {
      setAuth.setIsAuth(true);
      setAuth.setRole('teacher');
      setUser.setUser(user);
      change(false)
      navigate('/teacher', { state: { from: location }, replace: true });
    }
  }

  const onSuccess = () => {

  }

  const onError = (error: Error) => {
    notifyError(error.message)
  }

  const { isPending, login } = useLoginMutation({ onSuccess, onError });

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
              type="password"
              placeholder='Пароль'
              autoComplete='new-password'
            />
            <Button
              text='Войти'
              className={styles.button}
              width={210}
              isPending={isPending}
              buttonProps={{
                type: 'submit'
              }}
            />
          </form>
        </div>

        <img src={keyVisual} alt="" />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={8}
      />
    </>

  );
};

export default LoginModal;