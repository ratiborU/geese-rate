import { useParams } from "react-router-dom";
import { InstituteService } from "../../services/instituteService";
import EditInstituteWidget from "../../widgets/Institutes/EditInstituteWidget/EditInstituteWidget";
import { useQuery } from "@tanstack/react-query";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";

const EditInstitutePage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await InstituteService.getOne(Number(id)),
    queryKey: ["institute", id],
    staleTime: Infinity,
  });

  if (isLoading || !data) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <TitleWidget
        title={'Редактировать Институт'}
        description={'Функции администратора'}
      />
      <EditInstituteWidget data={data} />
    </>
  );
};

export default EditInstitutePage;