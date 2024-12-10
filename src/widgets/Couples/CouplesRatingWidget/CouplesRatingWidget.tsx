import CouplesRatingTable from "../../../components/Tables/CouplesRatingTable/CouplesRatingTable";
// import CouplesTable from "../../../components/Tables/CouplesTable/CouplesTable";
// import { ICourseResponse } from "../../../services/courseService";
import { ICoupleResponse } from "../../../services/coupleService";

const CoursesRatingWidget = (props: { data: ICoupleResponse[]; }) => {
  const { data } = props

  return (
    <CouplesRatingTable data={data} />
  );
};

export default CoursesRatingWidget;