// import { useQuery } from "@tanstack/react-query";
// import CoursesTable from "../../../components/Tables/CursesTable/CursesTable";
import { ICourseResponse } from "../../../services/courseService";
// import { NavLink } from "react-router-dom";
import CoursesTeacherTable from "../../../components/Tables/CoursesTeacherTable/CoursesTeacherTable";

const CoursesTeacherWidget = (props: { data: ICourseResponse[]; }) => {
  const { data } = props
  return (
    <CoursesTeacherTable data={data} />
  );
};

export default CoursesTeacherWidget;