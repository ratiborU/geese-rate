import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute.png'
import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";


const CouplesPage = () => {
  return (
    <>
      <TitleWidget
        title={`Пары`}
        description='Выберите нужную пару'
        image={image}
      />
      <CouplesWidget />
    </>
  );
};

export default CouplesPage;