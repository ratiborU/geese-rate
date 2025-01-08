import CreateCouplesWidget from "../../widgets/Couples/CreateCoupleWidget/CreateCoupleWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";

const CreateCouplesPage = () => {
  return (
    <>
      <TitleWidget
        title={`Создать пару`}
        description='Функции администратора'
      />
      <CreateCouplesWidget />
    </>

  );
};

export default CreateCouplesPage;