// import { useQuery } from "@tanstack/react-query";
import CoursesTable from "../../../components/Tables/CursesTable/CursesTable";
import { ICourseResponse } from "../../../services/courseService";
// import { NavLink } from "react-router-dom";

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
      <CoursesTable data={data} />
      {/* <NavLink to={`/admin/institutes/create`}>Добавить институт</NavLink> */}
    </>

  );
};

export default CoursesWidget;