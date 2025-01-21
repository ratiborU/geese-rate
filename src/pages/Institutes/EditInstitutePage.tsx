import { useParams } from "react-router-dom";
import EditInstituteWidget from "../../widgets/Institutes/EditInstituteWidget/EditInstituteWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import { useGetOneInstituteQuery } from "../../hooks/institutes/useGetOneInstituteQuery";

const EditInstitutePage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetOneInstituteQuery(Number(id));

  if (isFetching || !data) {
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