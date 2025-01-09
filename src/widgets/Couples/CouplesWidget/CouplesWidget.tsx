import LinkButton from '../../../components/UI/LinkButton/LinkButton';
import Table from '../../../components/UI/Table/Table';
import { ICoupleResponse } from "../../../services/coupleService";
import { tableName, headerLabels, keys, renderCels } from "./CouplesWidgetColumnData";
import styles from "./couplesWidget.module.css"

const CouplesWidget = (props: { data: ICoupleResponse[]; }) => {
  const { data } = props

  return (
    <>
      <LinkButton className={styles.button} text={"Добавить пару"} to='/admin/couples/create' />
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

export default CouplesWidget;