import { useParams, useSearchParams } from 'react-router-dom';
import LinkButton from '../../../components/UI/LinkButton/LinkButton';
import Table from '../../../components/UI/Table/Table';
import { ICoupleResponse } from "../../../services/coupleService";
import { tableName, headerLabels, renderCels } from "./CouplesWidgetColumnData";
import styles from "./couplesWidget.module.css"

const CouplesWidget = (props: { data: ICoupleResponse[]; }) => {
  const { data } = props
  const { id } = useParams();
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
        data={data}
      />
    </>
  );
};

export default CouplesWidget;