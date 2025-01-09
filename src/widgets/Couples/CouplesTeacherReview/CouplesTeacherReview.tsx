import Table from '../../../components/UI/Table/Table';
import { IReviewResponse } from '../../../services/reviewsService';
import { tableName, headerLabels, keys, renderCels } from "./CouplesTeachreviewWidgetColumnsData";
// import styles from "./couplesTeacherReviewWidget.module.css"

const CouplesTeacherReviewWidget = (props: { data: IReviewResponse[]; }) => {
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

export default CouplesTeacherReviewWidget;