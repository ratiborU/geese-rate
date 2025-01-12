import { ReactNode } from 'react';
import styles from './table.module.css'

type TableHeaderRowProps = {
  renderCels?: ((key: string) => ReactNode)[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row?: any,
  tableName: string,
}

const TableRow = (props: TableHeaderRowProps) => {
  const { row, renderCels, tableName } = props;
  return (
    <tr className={styles.line}>
      {...renderCels!.map((render, i) =>
        <th key={`${tableName} table row ${row.id} ${i}`} className={styles.cell}>
          {render(row!)}
        </th>
      )}
    </tr>
  );
};

export default TableRow;