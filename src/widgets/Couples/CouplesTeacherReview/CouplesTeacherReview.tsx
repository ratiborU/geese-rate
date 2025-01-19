import Button from '../../../components/UI/Button/Button';
import Table from '../../../components/UI/Table/Table';
import { IReviewResponse } from '../../../services/reviewsService';
import { tableName, headerLabels, renderCels } from "./CouplesTeacherReviewWidgetColumnsData";
import styles from "./couplesTeacherReviewWidget.module.css"
import { exportExcel } from '../../../lib/helpers/exportExcel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataWithCheckboxes } from './checkBoxData';



const CouplesTeacherReviewWidget = (props: { data: IReviewResponse[]; }) => {
  const { data } = props;
  const dataCheckboxes = getDataWithCheckboxes(data);
  const notify = () => toast.success("Файл успешно создан!");

  const onClick = () => {
    exportExcel(dataCheckboxes.filter(x => x.checked == true), 'посещаемость');
    notify();
  }

  return (
    <>
      <Button
        className={styles.button}
        text={"Выгрузить в Excel"}
        buttonProps={{
          onClick
        }}
      />
      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        data={dataCheckboxes}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={8}
      />
    </>

  );
};

export default CouplesTeacherReviewWidget;