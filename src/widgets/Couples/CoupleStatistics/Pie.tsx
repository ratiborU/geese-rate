// import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { IReviewResponse } from '../../../services/reviewsService';
import styles from './coupleStatistics.module.css'

const Pie = (props: { data: IReviewResponse[] }) => {
  const { data } = props;
  const newData = [0, 0, 0, 0, 0];
  data.forEach(x => newData[Number(x.rating) - 1]++);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Общая оценка пары',
      },
    },
  };

  const data1 = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Всего',
        data: newData,
        // backgroundColor: ['#ef4444', '#3b82f6', '#22c55e'],
      },
    ],
  };

  return (
    <div className={styles.pie}>
      <Chart type="pie" data={data1} options={options} />
    </div>
  );
};

export default Pie;