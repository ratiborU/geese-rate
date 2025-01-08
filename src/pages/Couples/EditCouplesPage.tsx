import { useParams } from "react-router-dom";
import EditCouplesWidget from "../../widgets/Couples/EditCoupleWidget/EditCoupleWidget";
import { useQuery } from "@tanstack/react-query";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import { CoupleService } from "../../services/coupleService";

const EditCouplesPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await CoupleService.getOne(Number(id)),
    queryKey: ["course", id],
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
        title={`Редактировать пару`}
        description='Функции администратора'
      />
      <EditCouplesWidget data={data} />
    </>

  );
};

export default EditCouplesPage;