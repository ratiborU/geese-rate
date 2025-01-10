// import { useQuery } from "@tanstack/react-query";
// import CoursesTable from "../../../components/Tables/CursesTable/CursesTable";
import { ICourseResponse } from "../../../services/courseService";
import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, renderCels } from "./CoursesWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import styles from "./coursesWidget.module.css"
import { useParams } from "react-router-dom";


const CoursesWidget = (props: { data: ICourseResponse[]; }) => {
  const { id } = useParams();
  const { data } = props
  return (
    <>
      <LinkButton className={styles.button} text={"Добавить предмет"} to={`/admin/courses/create?institute=${id || ''}`} />
      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        data={data}
      />
    </>

  );
};

export default CoursesWidget;