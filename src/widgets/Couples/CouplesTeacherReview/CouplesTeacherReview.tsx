import Button from '../../../components/UI/Button/Button';
import Table from '../../../components/UI/Table/Table';
import { IReviewResponse } from '../../../services/reviewsService';
import { tableName, headerLabels, renderCels } from "./CouplesTeachreviewWidgetColumnsData";
import styles from "./couplesTeacherReviewWidget.module.css"
// import image from '../../../assets/../../../assets/Список посещаемости.xlsx'
// import { useParams } from 'react-router-dom';

const CouplesTeacherReviewWidget = (props: { data: IReviewResponse[]; }) => {
  const { data } = props
  // const { id } = useParams();

  return (
    <>
      <a href={''} download={`image1.png`}>
        <Button
          className={styles.button}
          text={"Выгрузить в Excel"}
        />
      </a>
      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        data={data}
      />
    </>

  );
};

export default CouplesTeacherReviewWidget;