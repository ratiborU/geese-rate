import { useParams } from 'react-router-dom';
import LinkButton from '../../../components/UI/LinkButton/LinkButton';
import Table from '../../../components/UI/Table/Table';
import { LocalStorageService } from '../../../lib/helpers/localStorageService';
import { ICoupleResponse } from "../../../services/coupleService";
import { IUserResponse } from '../../../services/userService';
import { tableName, headerLabels, renderCels } from "./CouplesTeacherWidgetColumnsData";
import styles from "./couplesTeacherWidget.module.css"

const CouplesWidget = (props: { data: ICoupleResponse[]; }) => {
  const { data } = props
  const { id } = useParams();
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
        data={data}
      />
    </>

  );
};

export default CouplesWidget;