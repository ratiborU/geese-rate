import Table from '../../../components/UI/Table/Table';
import { useGetUsersQuery } from '../../../hooks/users/useGetUsersQuery';
import { tableName, headerLabels, renderCels } from "./UsersWidgetColumnsData";


const UsersWidget = () => {
  const { data, isFetching, error } = useGetUsersQuery();
  return (
    <Table
      headerLabels={headerLabels}
      tableName={tableName}
      renderCels={renderCels}
      isFetching={isFetching}
      error={error}
      data={data || []}
    />
  );
};

export default UsersWidget;