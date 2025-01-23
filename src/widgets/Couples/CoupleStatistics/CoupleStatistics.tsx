import Pie from './Pie';
import Bar from './Bar';
import { useParams } from 'react-router-dom';
import { useGetReviewsCoupleQuery } from '../../../hooks/reviews/useGetReviesCouple';
import styles from './coupleStatistics.module.css'
import TextData from './TextData';


const CoupleStatistics = () => {
  const { id } = useParams()
  const { data, isFetching } = useGetReviewsCoupleQuery(Number(id))

  if (isFetching || !data) {
    return <></>
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <Bar data={data} />
          <Pie data={data} />
        </div>
        <TextData data={data} />
      </div>


    </>

  );
};

export default CoupleStatistics;