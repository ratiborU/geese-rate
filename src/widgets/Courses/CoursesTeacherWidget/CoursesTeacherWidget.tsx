import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, renderCels } from "./CoursesTeacherWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import styles from "./coursesTeacherWidget.module.css"
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCoursesTeacherQuery } from "../../../hooks/courses/useGetCoursesTeacherQuery";


const CoursesTeacherWidget = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetCoursesTeacherQuery(id || '')
  const [searchParams] = useSearchParams();

  return (
    <>
      <LinkButton
        className={styles.button}
        text={"Добавить предмет"}
        to={`/admin/courses/create/?institute=${searchParams.get('institute')}&teacher=${id}`}
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

export default CoursesTeacherWidget;