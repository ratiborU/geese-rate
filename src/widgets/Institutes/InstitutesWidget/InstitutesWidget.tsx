import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, renderCels } from "./InstitutesWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { useGetInstitutesQuery } from "../../../hooks/institutes/useGetInstitutesQuery";

import styles from './institutesWidget.module.css'

const InstitutesWidget = () => {
  const { data, isFetching, error } = useGetInstitutesQuery();

  if (isFetching || !data) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <LinkButton className={styles.button} text={"Добавить институт"} to='/admin/institutes/create' />
      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        data={data}
      />
    </>

  );
};

export default InstitutesWidget;