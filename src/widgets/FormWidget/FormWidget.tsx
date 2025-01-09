import styles from './formWidget.module.css'
import Input from '../../components/UI/Inputs/Input/Input';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Inputs/Textarea/Teaxtarea';
import { z } from 'zod';
import RadioButton from '../../components/UI/Buttons/RadioButton/RadioButton';
import { ReviewService } from '../../services/reviewsService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LocalStorageService } from '../../lib/helpers/localStorageService';

const createReviewSchema = z.object({
  user: z.string().min(1, "!"),
  lesson: z.string().min(1, "!"),
  rating: z.string().min(1, "!"),
  comment: z.string().min(1, "!"),
  advantages: z.array(z.string()),
  is_anonymous: z.string().min(1, "!").default('False'),
})
// engaging, clear, organized, interactive, practical

type TCreateReviewSchema = z.infer<typeof createReviewSchema>;

const FormWidget = (props: { id: string; }) => {
  const { id } = props;
  const { register, handleSubmit, setValue } = useForm<TCreateReviewSchema>({ resolver: zodResolver(createReviewSchema) });

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
    'engaging',
    'clear',
    'organized',
    'interactive',
    'practical ',
    'practical ',
    'practical ',
  ]

  const onSubmit = async (data: TCreateReviewSchema) => {
    await ReviewService.create(data as unknown as TCreateReviewSchema);
    LocalStorageService.save(`rate ${id}`, true);
    LocalStorageService.save(`FIO`, data.user)
    LocalStorageService.save(`isAnonymous`, data.is_anonymous)
    location.reload();
  }

  const reset = async () => {
    LocalStorageService.remove(`rate ${id}`);
    location.reload();
  }

  // LocalStorageService.save(`rate ${id}`, false)
  if (LocalStorageService.get(`rate ${id}`)) {
    return (
      <>
        <div className={styles.block}>
          <p className={styles.title}>Спасибо за ваш отзыв!</p>
          <Button
            text='Оставить еще'
            buttonProps={{
              onClick: reset
            }}
          />
        </div>
      </>
    )
  }

  const onRateSelect = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setValue('rating', e.currentTarget.value);
  }

  const onFavoriteSelect = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setValue('advantages', [e.currentTarget.value]);
  }

  const onAnonSelect = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setValue('is_anonymous', e.currentTarget.checked ? 'True' : 'False');
  }


  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Голос Студента</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='ФИО'
          inputProps={{
            id: 'create-course-name',
            ...register('user'),
            type: "text",
            placeholder: 'Введите ваше ФИО(integer)...',
            autoComplete: "new-password",
            defaultValue: LocalStorageService.get(`FIO`) || '',
          }}
        />
        <div>
          <p className={styles.text}>Оцените, пожалуйста, общее впечатление от пары по шкале от 1 до 5, где </p>
          <p className={styles.text}>1 - пара совсем не понравилась,</p>
          <p className={styles.text}>5 - очень понравилась</p>
        </div>


        <div className={styles.rates}>
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
        </div>

        <p className={styles.text}>Что вам понравилось больше всего?</p>
        <div className={styles.favorites}>
          {...[...Array(7)].map((_, i) =>
            <RadioButton
              key={`review-favorite-${i + 1}`}
              label={favoriteList[i]}
              inputProps={{
                name: 'favorite',
                value: favoriteListValues[i],
                id: `review-favorite-${i + 1}`,
                onClick: onFavoriteSelect
              }}
            />
          )}
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

        <div>
          <input
            onClick={onAnonSelect}
            defaultChecked={LocalStorageService.get(`isAnonymous`) == 'True' || false}
            className={styles.checkbox}
            type="checkbox"
            id='isAnonymous'
          />
          <label className={styles.label} htmlFor='isAnonymous'> Остаться анонимным</label>
        </div>

        {/* Пустышки */}
        <input className={styles.inputNone} type="text" {...register('rating')} />
        <input className={styles.inputNone} type="text" {...register('advantages')} />
        <input value={id} className={styles.inputNone} type="text" {...register('lesson')} />
        <input className={styles.inputNone} type="text" {...register('is_anonymous')} />

        <Button
          text='Отправить'
          buttonProps={{
            type: 'submit'
          }}
        />
      </form>
    </div>
  );
};

export default FormWidget;