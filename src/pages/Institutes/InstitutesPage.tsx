import InstitutesWidget from "../../widgets/Institutes/InstitutesWidget/InstitutesWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";

const InstitutesPage = () => {
  return (
    <div>
      <TitleWidget title='Институты' description='' />
      <InstitutesWidget />
    </div>
  );
};

export default InstitutesPage;