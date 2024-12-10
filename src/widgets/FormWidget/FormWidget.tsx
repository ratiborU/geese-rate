// import { z } from 'zod';
import styles from './formWidget.module.css'
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';

// import { InstituteService } from '../../../services/instituteService';
import { CourseService } from '../../services/courseService';
import { LocalStorageService } from '../../lib/helpers/localStorageService';
import { ICourseResponse } from '../../services/courseService';
import { useState } from 'react';

// const createUserSchema = z.object({
//   name: z.string().min(1, "Это поле обязательно для заполнения"),
//   institute: z.string().min(1, "Это поле обязательно для заполнения"),
//   teacher: z.string().min(1, "Это поле обязательно для заполнения"),
//   schedule: z.string().min(1, "Это поле обязательно для заполнения")
// })


const FormWidget = (props: { id: string; data: ICourseResponse }) => {
  const { id, data } = props;
  const [rate, setRate] = useState(0);

  const onSubmit = async (data) => {
    LocalStorageService.save(`rate ${id}`, true)
  }
  // LocalStorageService.save(`rate ${id}`, false)
  if (LocalStorageService.get(`rate ${id}`)) {
    return <>Спасибо за ваш отзыв</>
  }

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>{data.name}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.buttonsRate}>
          <button className={rate == 1 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(1)} type='button'>1</button>
          <button className={rate == 2 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(2)} type='button'>2</button>
          <button className={rate == 3 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(3)} type='button'>3</button>
          <button className={rate == 4 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(4)} type='button'>4</button>
          <button className={rate == 5 ? styles.buttonRateActive : styles.buttonRate} onClick={() => setRate(5)} type='button'>5</button>
        </div>
        <textarea
          className={styles.textarea}
          placeholder='Комментарий (по желанию)'
        />
        <div>
          <input className={styles.checkbox} type="checkbox" id='isAnonymous' />
          <label className={styles.label} htmlFor='isAnonymous'> Остаться анонимным</label>
        </div>

        <button className={styles.button} type='submit'>Отправить</button>
      </form>
    </div>
  );
};

export default FormWidget;