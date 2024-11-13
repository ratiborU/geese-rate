import { useQuery } from "@tanstack/react-query";
import { InstituteService } from "../../services/instituteService";
import InstitutesTable from "../../components/InstitutesTable/InstitutesTable";
// import { NavLink } from "react-router-dom";

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
      <InstitutesTable data={data} />
      {/* <NavLink to={`/admin/institutes/create`}>Добавить институт</NavLink> */}
    </>

  );
};

export default InstitutesWidget;