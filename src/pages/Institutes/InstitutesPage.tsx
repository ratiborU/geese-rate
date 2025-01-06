import InstitutesWidget from "../../widgets/Institutes/InstitutesWidget/InstitutesWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute.png'

const InstitutesPage = () => {
  return (
    <div>
      <TitleWidget
        title='Институты'
        description='Выберите необходимые вам институты'
        image={image}
      />
      <InstitutesWidget />
    </div>
  );
};

export default InstitutesPage;