// import CouplesTable from "../../../components/Tables/CouplesTable/CouplesTable";
// import LinkButton from '../../../components/UI/LinkButton/LinkButton';
import Table from '../../../components/UI/Table/Table';
// import { ICoupleResponse } from "../../../services/coupleService";
import { IReviewResponse } from '../../../services/reviewsService';
import { tableName, headerLabels, keys, renderCels } from "./CouplesTeachreviewWidgetColumnsData";
// import styles from "./couplesTeacherReviewWidget.module.css"

const CouplesTeacherReviewWidget = (props: { data: IReviewResponse[]; }) => {
  const { data } = props

  return (
    <>
      {/* <LinkButton className={styles.button} text={"Добавить отзыв"} to='/admin/couples/create' /> */}
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