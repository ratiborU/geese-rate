// import { useQuery } from "@tanstack/react-query";
// import CoursesTable from "../../../components/Tables/CursesTable/CursesTable";
import { ICourseResponse } from "../../../services/courseService";
import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, keys, renderCels } from "./CoursesWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import styles from "./coursesWidget.module.css"
const CoursesWidget = (props: { data: ICourseResponse[]; }) => {
  const { data } = props
  // не нравится структура проекта, 
  // зпросы долдны находиться в page
  // const { data, isLoading, error } = useQuery({
  //   queryFn: async () => await CourseService.getAll(),
  //   queryKey: ["courses"],
  //   // staleTime: Infinity,
  // });

  // if (isLoading || !data) {
  //   return <>Загрузка...</>
  // }

  // if (error) {
  //   return <>{error.message}</>
  // }

  return (
    <>
      <LinkButton className={styles.button} text={"Добавить предмет"} to='/admin/courses/create' />
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

export default CoursesWidget;