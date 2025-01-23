import Table from "../../../components/UI/Table/Table";
import { tableName, headerLabels, renderCels } from "./TeacherWidgetColumnsData";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import styles from "./teacherWidget.module.css"
import { LocalStorageService } from "../../../lib/helpers/localStorageService";
import { IUserResponse } from "../../../services/userService";
import { useGetCoursesTeacherQuery } from "../../../hooks/courses/useGetCoursesTeacherQuery";

const TeacherWidget = () => {
  const user: IUserResponse = LocalStorageService.get('user')!;
  const { data, isFetching, error } = useGetCoursesTeacherQuery(user.id);

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
        isFetching={isFetching}
        error={error}
        data={data || []}
      />
    </>

  );
};

export default TeacherWidget;