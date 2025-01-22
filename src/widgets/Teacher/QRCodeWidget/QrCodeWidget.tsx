import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateQrMutation } from '../../../hooks/qr/useGetQrCodeQuery';
import { IQrRequest } from '../../../services/qrService';
import Input from '../../../components/UI/Inputs/Input/Input';
import Button from '../../../components/UI/Button/Button';
import styles from './qrCodeWidget.module.css'
import { NavLink } from 'react-router-dom';

const createLessonSchema = z.object({
  link: z.string(),
  expiration_time: z.string(),
  time_unit: z.string(),
})

type TCreateLessonSchema = z.infer<typeof createLessonSchema>;


const QrCodeWidget = () => {
  const { id } = useParams();
  const qrLink = `${import.meta.env.VITE_FRONTEND_URL}/form/${id}`;
  // const [isQrCreated, setIsQrCreated] = useState(false);
  const [qr, setQr] = useState('');
  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit } = useForm<TCreateLessonSchema>({ resolver: zodResolver(createLessonSchema) });

  const onSubmit = async (formData: TCreateLessonSchema) => {
    const qrLink = await createQr({ ...formData } as IQrRequest);
    setQr(qrLink.qr_code_url);
  }

  const onSuccess = () => {
    notify("Qr код успешно создан!");
    // setIsQrCreated(true);
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const onCopyLink = () => {
    window.navigator.clipboard.writeText(qrLink);
    notify("Ссылка скопирована в буфер обмена!");
  }

  const { isPending, createQr } = useCreateQrMutation({ onSuccess, onError });

  if (qr) {
    return (
      <>
        <div className={styles.qrBlock}>
          <img className={styles.qr} src={qr} alt="" />
          <NavLink className={styles.p} to={qrLink}>{qrLink}</NavLink>
          <Button
            text='Копировать Qr код'
            onClick={onCopyLink}
          />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          limit={8}
        />
      </>

    )
  }

  return (
    <>
      <form className={styles.from} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Длительность отзыва в минутах'
          inputProps={{
            id: 'create-course-name',
            ...register('expiration_time'),
            type: "text",
            placeholder: 'Введите название предмета...',
            autoComplete: "new-password",
            defaultValue: 15,
            style: {
              width: 180
            }
          }}
        />
        <input
          className={styles.none}
          type="text"
          {...register('link')}
          value={qrLink}
        />
        <input
          className={styles.none}
          type="text"
          {...register('time_unit')}
          value={'minutes'}
        />
        <Button
          text='Создать Qr код'
          isPending={isPending}
        />
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={8}
      />
    </>
    // <div>
    //   <img style={{
    //     display: 'block',
    //     margin: '0px auto',
    //     marginBottom: '60px',
    //     marginTop: '60px'
    //   }} src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrLink}&size=600x600&bgcolor=ffffff`} alt="" />
    //   <div style={{
    //     textAlign: 'center',
    //     width: '100%',
    //     fontSize: '32px'
    //   }}>
    //     <NavLink to={qrLink}>{qrLink}</NavLink>
    //   </div>
    //   <ToastContainer
    //     position="bottom-right"
    //     autoClose={3000}
    //     limit={8}
    //   />
    // </div>
  );
};

export default QrCodeWidget;