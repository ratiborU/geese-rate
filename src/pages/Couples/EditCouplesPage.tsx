import { useParams } from "react-router-dom";
import EditCouplesWidget from "../../widgets/Couples/EditCoupleWidget/EditCoupleWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import { useGetOneCoupleQuery } from "../../hooks/couples/useGetOneCoupleQuery";

const EditCouplesPage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetOneCoupleQuery(Number(id));

  if (isFetching || !data) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <TitleWidget
        title={`Редактировать пару`}
        description='Функции администратора'
      />
      <EditCouplesWidget data={data} />
    </>

  );
};

export default EditCouplesPage;