import styles from './formWidget.module.css'
import Input from '../../components/UI/Inputs/Input/Input';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Inputs/Textarea/Teaxtarea';
import { z } from 'zod';
import RadioButton from '../../components/UI/Buttons/RadioButton/RadioButton';
// import { ReviewService } from '../../services/reviewsService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LocalStorageService } from '../../lib/helpers/localStorageService';
import { useCreateReviewMutation } from '../../hooks/reviews/useCreateReviewMutation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRate from '../../components/UI/Inputs/StarRate/StarRate';
import { useGetOneCoupleQuery } from '../../hooks/couples/useGetOneCoupleQuery';
import TableLoader from '../../components/UI/TableLoader/TableLoader';
import { checkFormAvailable } from '../../lib/helpers/checkFormAvailable';


const createReviewSchema = z.object({
  user: z.string().min(1, "!"),
  lesson: z.string().min(1, "!"),
  rating: z.string().min(1, "!"),
  comment: z.string(),
  advantages: z.array(z.string()),
  is_anonymous: z.string().min(1, "!").default('False'),
})
// engaging, clear, organized, interactive, practical

type TCreateReviewSchema = z.infer<typeof createReviewSchema>;

const FormWidget = (props: { id: string; }) => {
  const { id } = props;
  const notify = () => toast.success("Отзыв успешно создан!");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit, setValue } = useForm<TCreateReviewSchema>({ resolver: zodResolver(createReviewSchema) });

  const { data: couple, isFetching } = useGetOneCoupleQuery(Number(id));

  const favorites = [false, false, false, false, false, false, false]

  const favoriteList = [
    'Полезный материал',
    'Подача материала',
    'Доброжелательность преподавателя',
    'Взаимодействие со студентами',
    'Аудитория и оборудование',
    'Сложность заданий на паре',
    'Предоставление материалов',
  ]
  const favoriteListValues = [
    'usefulness',
    'delivery',
    'kindness',
    'interaction',
    'equipment',
    'difficulty',
    'materials',
  ]

  const onSubmit = async (data: TCreateReviewSchema) => {

    data.advantages = favoriteListValues.filter((_, i) => favorites[i])
    await createReview(data);
    LocalStorageService.save(`rate ${id}`, true);
    LocalStorageService.save(`FIO`, data.user)
    LocalStorageService.save(`isAnonymous`, data.is_anonymous)
    location.reload();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const onSuccess = () => {
    notify();
  }

  const { isPending, createReview } = useCreateReviewMutation({ onSuccess, onError });

  // const reset = async () => {
  //   LocalStorageService.remove(`rate ${id}`);
  //   location.reload();
  // }

  // LocalStorageService.save(`rate ${id}`, false)

  if (isFetching || !couple) {
    return <TableLoader />
  }

  if (LocalStorageService.get(`rate ${id}`)) {
    return (
      <>
        {/* <div className={styles.thanksBlock}>
          <p className={styles.title}>Спасибо за ваш отзыв!</p>
          <Button
            text='Оставить еще'
            buttonProps={{
              onClick: reset
            }}
          />
        </div> */}
        <p className={styles.titleThanks}>Спасибо за ваш отзыв!</p>
      </>
    )
  }

  if (checkFormAvailable(couple?.date, couple?.time)) {
    return <p className={styles.titleThanks}>Форма закрыта</p>
  }

  // const onRateSelect = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  //   setValue('rating', e.currentTarget.value);
  // }

  const onRateSelect2 = (rate: number) => {
    setValue('rating', rate.toString());
  }

  const onFavoriteSelect = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    favorites[Number(e.currentTarget.value)] = e.currentTarget.checked;
    setValue('advantages', [e.currentTarget.value]);
  }

  const onAnonSelect = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setValue('is_anonymous', e.currentTarget.checked ? 'True' : 'False');
  }


  return (
    <div className={styles.block}>
      <h1 className={styles.title}>{couple?.topic}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='*Введите ФИО:'
          inputProps={{
            id: 'create-course-name',
            ...register('user'),
            type: "text",
            placeholder: 'Ваше ФИО(integer)...',
            autoComplete: "new-password",
            defaultValue: LocalStorageService.get(`FIO`) || '',
          }}
        />

        <div>
          <p className={styles.text}>*Общая оценка пары:</p>
          <StarRate changeRate={onRateSelect2} />
        </div>


        {/* <div className={styles.rates}>
          {...[...Array(5)].map((_, i) =>
            <RadioButton
              key={`review-rate-${i + 1}`}
              label={String(i + 1)}
              inputProps={{
                name: 'rate',
                value: String(i + 1),
                id: `review-rate-${i + 1}`,
                onClick: onRateSelect
              }}
            />
          )}
        </div> */}
        <div>
          <p className={styles.text}>*Что вам понравилось больше всего:</p>
          <div className={styles.favorites}>
            {...[...Array(7)].map((_, i) =>
              <RadioButton
                key={`review-favorite-${i + 1}`}
                label={favoriteList[i]}
                inputProps={{
                  name: 'favorite',
                  value: i,
                  id: `review-favorite-${i + 1}`,
                  type: 'checkbox',
                  onClick: onFavoriteSelect
                }}
              />
            )}
          </div>
        </div>


        <Textarea
          label='Развернутый отзыв'
          inputProps={{
            id: 'create-course-name',
            placeholder: 'По желанию',
            autoComplete: "new-password",
            ...register('comment')
          }}
        />

        <RadioButton
          // className={styles.checkbox},
          label='Остаться анонимным'
          inputProps={{
            onClick: onAnonSelect,
            defaultChecked: LocalStorageService.get(`isAnonymous`) == 'True' || false,
            type: "checkbox",
            id: 'isAnonymous',
          }}
        />
        {/* <div>
          <input
            onClick={onAnonSelect}
            defaultChecked={LocalStorageService.get(`isAnonymous`) == 'True' || false}
            className={styles.checkbox}
            type="checkbox"
            id='isAnonymous'
          />
          <label className={styles.label} htmlFor='isAnonymous'> Остаться анонимным</label>
        </div> */}

        {/* Пустышки */}
        <input className={styles.inputNone} type="text" {...register('rating')} />
        <input className={styles.inputNone} type="text" {...register('advantages')} />
        <input value={id} className={styles.inputNone} type="text" {...register('lesson')} />
        <input defaultValue={LocalStorageService.get(`isAnonymous`) ? LocalStorageService.get(`isAnonymous`)! : 'False'} className={styles.inputNone} type="text" {...register('is_anonymous')} />

        <Button
          text='Отправить'
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
    </div>
  );
};

export default FormWidget;