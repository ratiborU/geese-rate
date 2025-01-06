import { useParams } from "react-router-dom";
import EditCouplesWidget from "../../widgets/Couples/EditCoupleWidget/EditCoupleWidget";
import { useQuery } from "@tanstack/react-query";
import { CourseService } from "../../services/courseService";

const EditCouplesPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await CourseService.getOne(Number(id)),
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
    <EditCouplesWidget data={data} />
  );
};

export default EditCouplesPage;