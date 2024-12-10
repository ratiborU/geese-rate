import CouplesTable from "../../../components/Tables/CouplesTable/CouplesTable";
// import { ICourseResponse } from "../../../services/courseService";
import { ICoupleResponse } from "../../../services/coupleService";

const CouplesWidget = (props: { data: ICoupleResponse[]; }) => {
  const { data } = props

  return (
    <CouplesTable data={data} />
  );
};

export default CouplesWidget;