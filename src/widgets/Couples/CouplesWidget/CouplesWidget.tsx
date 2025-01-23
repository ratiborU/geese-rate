import { useParams, useSearchParams } from 'react-router-dom';
import LinkButton from '../../../components/UI/LinkButton/LinkButton';
import Table from '../../../components/UI/Table/Table';
import { tableName, headerLabels, renderCels } from "./CouplesWidgetColumnData";
import styles from "./couplesWidget.module.css"
import { useGetCouplesCourseQuery } from '../../../hooks/couples/useGetCouplesCourse';

const CouplesWidget = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetCouplesCourseQuery(Number(id));
  const [searchParams] = useSearchParams();

  return (
    <>
      <LinkButton
        className={styles.button}
        text={"Добавить пару"}
        to={`/admin/couples/create/?institute=${searchParams.get('institute')}&course=${id}&teacher=${searchParams.get('teacher') || ''}`}
      />
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

export default CouplesWidget;