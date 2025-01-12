import { useQuery } from "@tanstack/react-query";
import { InstituteService } from "../../../services/instituteService";
import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, renderCels } from "./InstitutesWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";

import styles from './institutesWidget.module.css'

const InstitutesWidget = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await InstituteService.getAll(),
    queryKey: ["institutes"],
    // staleTime: Infinity,
  });

  if (isLoading || !data) {
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