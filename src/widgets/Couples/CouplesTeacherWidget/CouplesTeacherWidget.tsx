import { useParams } from 'react-router-dom';
import LinkButton from '../../../components/UI/LinkButton/LinkButton';
import Table from '../../../components/UI/Table/Table';
import { LocalStorageService } from '../../../lib/helpers/localStorageService';
import { IUserResponse } from '../../../services/userService';
import { tableName, headerLabels, renderCels } from "./CouplesTeacherWidgetColumnsData";
import styles from "./couplesTeacherWidget.module.css"
import { useGetCouplesCourseQuery } from '../../../hooks/couples/useGetCouplesCourse';

const CouplesWidget = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetCouplesCourseQuery(Number(id));
  // изменить на useContext
  const user: IUserResponse | null = LocalStorageService.get('user');

  return (
    <>
      <LinkButton
        className={styles.button}
        text={"Добавить пару"}
        to={`/admin/couples/create?teacher=${user?.id}&course=${id}`}
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