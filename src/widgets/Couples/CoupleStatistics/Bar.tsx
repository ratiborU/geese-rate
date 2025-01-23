// import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { IReviewResponse } from '../../../services/reviewsService';
import styles from './coupleStatistics.module.css'
import { useMemo } from 'react';

// тоже херня какая-то
const labelsObj = {
  'usefulness': 0,
  'delivery': 1,
  'kindness': 2,
  'interaction': 3,
  'equipment': 4,
  'difficulty': 5,
  'materials': 6,
}
type key =
  'usefulness' |
  'delivery' |
  'kindness' |
  'interaction' |
  'equipment' |
  'difficulty' |
  'materials';

const Bar = (props: { data: IReviewResponse[] }) => {
  const { data } = props;

  // плохо выглядит можно переделать
  const newData = useMemo(() => {
    const ar = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].advantages.length; j++) {
        if (labelsObj[data[i].advantages[j] as key] !== undefined) {
          ar[labelsObj[data[i].advantages[j] as key]]++;
        }
      }
    }
    return ar;
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Steps taken per day',
      },
    },
  };

  const data1 = {
    labels: [
      'Полезность',
      'Подача',
      'Доброта',
      'Интерактив',
      'Оборудование',
      'Сложность',
      'Материалы ',
    ],
    datasets: [
      {
        label: 'Характеристика пары',
        data: newData,
        // backgroundColor: '#ef4444',
      },
      // {
      //   label: 'Jane',
      //   data: [8010, 9432, 9401, 8790, 10431, 9110, 8833],
      //   backgroundColor: '#3b82f6',
      // },
    ],
  };


  return (
    <div className={styles.bar}>
      <Chart type="bar" data={data1} options={options} />
    </div>
  );
};

export default Bar;