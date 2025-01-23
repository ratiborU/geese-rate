import { LocalStorageService } from "../lib/helpers/localStorageService";
import { IUserResponse } from "../services/userService";
import TitleWidget from "../widgets/TitleWidget/TitleWidget";
import image from '../assets/institute people.png'
import TeacherWidget from "../widgets/Teacher/TeacherWidget/TeacherWidget";


const TeacherPage = () => {
  const teacher: IUserResponse = LocalStorageService.get('user')!;

  return (
    <div>
      <TitleWidget
        title='Student Voice'
        description={`Добро пожаловать, ${teacher.first_name || ''}`}
        image={image}
      />
      <TeacherWidget />
    </div>
  );
};

export default TeacherPage;