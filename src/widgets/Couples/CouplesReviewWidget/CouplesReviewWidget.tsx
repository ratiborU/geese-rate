import Table from '../../../components/UI/Table/Table';
import { IReviewResponse } from '../../../services/reviewsService';
import { tableName, headerLabels, keys, renderCels } from "./CouplesReviewWidgetColumnsData";
// import styles from "./couplesTeacherReviewWidget.module.css"

const CouplesReviewWidget = (props: { data: IReviewResponse[]; }) => {
  const { data } = props

  return (
    <>
      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        data={data}
        keys={keys}
      />
    </>

  );
};

export default CouplesReviewWidget;