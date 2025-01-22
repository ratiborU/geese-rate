import Button from '../../../components/UI/Button/Button';
import Table from '../../../components/UI/Table/Table';
import { tableName, headerLabels, renderCels } from "./CouplesTeacherReviewWidgetColumnsData";
import styles from "./couplesTeacherReviewWidget.module.css"
import { exportExcel } from '../../../lib/helpers/exportExcel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataWithCheckboxes } from './checkBoxData';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetReviewsCoupleQuery } from '../../../hooks/reviews/useGetReviesCouple';
import { useGetOneCourseQuery } from '../../../hooks/courses/useGetOneCourseQuery';
import { getNowDate } from '../../../lib/helpers/getNowDate';



const CouplesTeacherReviewWidget = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data, isFetching, error } = useGetReviewsCoupleQuery(Number(id));

  const { data: course } = useGetOneCourseQuery(Number(searchParams.get('course')));

  const dataCheckboxes = getDataWithCheckboxes(data || []);
  const notify = () => toast.success("Файл успешно создан!");

  const onClick = () => {
    exportExcel(dataCheckboxes.filter(x => x.checked == true), `Посещаемость ${course?.name} за ${getNowDate()}`);
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
        isFetching={isFetching}
        error={error}
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