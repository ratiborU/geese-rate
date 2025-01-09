import { ICourseResponse } from "../../../services/courseService";
import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, renderCels } from "./TeacherWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import styles from "./teacherWidget.module.css"
import { LocalStorageService } from "../../../lib/helpers/localStorageService";
import { IUserResponse } from "../../../services/userService";

const TeacherWidget = (props: { data: ICourseResponse[]; }) => {
  const { data } = props;
  const user: IUserResponse | null = LocalStorageService.get('user');
  return (
    <>
      <div className={styles.buttons}>
        <LinkButton
          className={styles.button}
          text={"Добавить предмет"}
          to={`/admin/courses/create?teacher=${user?.id}`}
          width={250}
        />
        <LinkButton
          className={styles.button2}
          text={"Обновить данные из модеуса"}
          to='/admin/courses/create'
          width={350}
        />
      </div>

      <Table
        headerLabels={headerLabels}
        tableName={tableName}
        renderCels={renderCels}
        data={data}
      />
    </>

  );
};

export default TeacherWidget;