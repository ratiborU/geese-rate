// import { useQuery } from "@tanstack/react-query";
// import CoursesTable from "../../../components/Tables/CursesTable/CursesTable";
import { ICourseResponse } from "../../../services/courseService";
// import { NavLink } from "react-router-dom";
// import CoursesTeacherTable from "../../../components/Tables/CoursesTeacherTable/CoursesTeacherTable";
import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, keys, renderCels } from "./CoursesTeacherWidgetColumnsData";

const CoursesTeacherWidget = (props: { data: ICourseResponse[]; }) => {
  const { data } = props
  return (
    <Table
      headerLabels={headerLabels}
      tableName={tableName}
      renderCels={renderCels}
      data={data}
      keys={keys}
    />
  );
};

export default CoursesTeacherWidget;