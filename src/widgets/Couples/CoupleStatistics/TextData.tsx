import { useMemo } from 'react';
import { IReviewResponse } from '../../../services/reviewsService';
import styles from './coupleStatistics.module.css'

const TextData = (props: { data: IReviewResponse[] }) => {
  const { data } = props;
  const rate = useMemo(() => {
    const sum = data.reduce((acc, cur) => acc + Number(cur.rating), 0);
    return (sum / data.length).toFixed(2);
  }, [data]);
  const csat = useMemo(() => {
    const sum = data.reduce((acc, cur) => acc + (Number(cur.rating) >= 4 ? 1 : 0), 0);
    console.log(sum);
    return (sum / data.length * 100).toFixed(2);
  }, [data]);
  const cdsat = useMemo(() => {
    const sum = data.reduce((acc, cur) => acc + (Number(cur.rating) <= 2 ? 1 : 0), 0);
    return (sum / data.length * 100).toFixed(2);
  }, [data]);

  return (
    <div className={styles.textBlock}>
      <div className={styles.blockSegment}>
        <p className={styles.text}>{`Проголосовало ${data.length} студентов`}</p>
        <p className={styles.text}>{`Средняя оценка - ${rate}`}</p>
      </div>
      <div className={styles.blockSegment}>
        <p className={styles.text}>{`Удовлетворенность студентов (CSAT) - ${csat}%`}</p>
        <p className={styles.text}>{`Неудовлетворенность студентов (CDSAT) - ${cdsat}%`}</p>
      </div>
    </div>
  );
};

export default TextData;