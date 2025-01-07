import React from 'react';
import Table from '../../../components/UI/Table/Table';
import { IUserResponse } from '../../../services/userService';
import { tableName, headerLabels, keys, renderCels } from "./UsersWidgetColumnsData";


const UsersWidget = (props: { data: IUserResponse[]; }) => {
  const { data } = props;
  return (
    <Table
      headerLabels={headerLabels}
      tableName={tableName}
      renderCels={renderCels}
      data={data}
      keys={keys}
    />
  );
};

export default UsersWidget;