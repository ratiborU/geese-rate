// import { z } from 'zod';
import styles from './formWidget.module.css'
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';

// import { InstituteService } from '../../../services/instituteService';
// import { LocalStorageService } from '../../lib/helpers/localStorageService';
// import { useState } from 'react';
import Input from '../../components/UI/Inputs/Input/Input';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Inputs/Textarea/Teaxtarea';
import { z } from 'zod';
import RadioButton from '../../components/UI/Buttons/RadioButton/RadioButton';
import { ReviewService } from '../../services/reviewsService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { useState } from 'react';
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


  // const [rate, setRate] = useState('0');
  // const [favorite, setFavorite] = useState('0');
  // const [advantages, setAdvantages] = useState([]);


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
    // console.log(data);
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

  const test = () => {
    // console.log(getValues('user'), getValues('lesson'), getValues('rating'), getValues('comment'), getValues('advantages'), getValues('is_anonymous'));
    // console.log('user', getValues('user'));
    // console.log('lesson', getValues('lesson'));
    // console.log('rating', getValues('rating'));
    // console.log('comment', getValues('comment'));
    // console.log('advantages', getValues('advantages'));
    // console.log('is_anonymous', getValues('is_anonymous'));

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

        {/* <div className={styles.buttonsRate}>
          <button className={rate == 1 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(1)} type='button'>1</button>
          <button className={rate == 2 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(2)} type='button'>2</button>
          <button className={rate == 3 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(3)} type='button'>3</button>
          <button className={rate == 4 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(4)} type='button'>4</button>
          <button className={rate == 5 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(5)} type='button'>5</button>
        </div> */}

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

        {/* Пстышки */}
        <input className={styles.inputNone} type="text" {...register('rating')} />
        <input className={styles.inputNone} type="text" {...register('advantages')} />
        <input value={id} className={styles.inputNone} type="text" {...register('lesson')} />
        <input className={styles.inputNone} type="text" {...register('is_anonymous')} />

        <Button
          text='Отправить'
          buttonProps={{
            type: 'submit',
            onClick: test
          }}
        />
      </form>
    </div>
  );
};

export default FormWidget;