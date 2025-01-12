import Table from '../../../components/UI/Table/Table';
import { IUserResponse } from '../../../services/userService';
import { tableName, headerLabels, renderCels } from "./UsersWidgetColumnsData";


const UsersWidget = (props: { data: IUserResponse[]; }) => {
  const { data } = props;
  return (
    <Table
      headerLabels={headerLabels}
      tableName={tableName}
      renderCels={renderCels}
      data={data}
    />
  );
};

export default UsersWidget;