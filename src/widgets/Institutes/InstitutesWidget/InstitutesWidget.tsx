import { useQuery } from "@tanstack/react-query";
import { InstituteService } from "../../../services/instituteService";
// import InstitutesTable from "../../../components/Tables/InstitutesTable/InstitutesTable";
import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, keys, renderCels } from "./InstitutesWidgetColumnsData";
// import Button from "../../../components/UI/Button/Button";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";

import styles from './institutesWidget.module.css'

const InstitutesWidget = () => {
  // не нравится структура проекта, 
  // зпросы долдны находиться в page
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
      {/* <InstitutesTable data={data} /> */}
      <LinkButton className={styles.button} text={"Добавить институт"} to='/admin/institutes/create' />
      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        data={data}
        keys={keys}
      />
      {/* <NavLink to={`/admin/institutes/create`}>Добавить институт</NavLink> */}
    </>

  );
};

export default InstitutesWidget;