import { useParams } from 'react-router-dom';
import Table from '../../../components/UI/Table/Table';
import { tableName, headerLabels, renderCels } from "./CouplesReviewWidgetColumnsData";
import { useGetReviewsCoupleQuery } from '../../../hooks/reviews/useGetReviesCouple';
// import styles from "./couplesTeacherReviewWidget.module.css"

const CouplesReviewWidget = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetReviewsCoupleQuery(Number(id));

  return (
    <>
      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        isFetching={isFetching}
        error={error}
        data={data || []}
      />
    </>

  );
};

export default CouplesReviewWidget;