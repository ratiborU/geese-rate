import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, renderCels } from "./CoursesWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import styles from "./coursesWidget.module.css"
import { useParams } from "react-router-dom";
import { useGetCoursesInstituteQuery } from "../../../hooks/courses/useGetCoursesInstituteQuery";


const CoursesWidget = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetCoursesInstituteQuery(id || '')

  return (
    <>
      <LinkButton className={styles.button} text={"Добавить предмет"} to={`/admin/courses/create?institute=${id || ''}`} />
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

export default CoursesWidget;