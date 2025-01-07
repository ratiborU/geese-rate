import { ReactNode } from 'react';
import styles from './table.module.css'

type TableHeaderRowProps = {
  renderCels?: ((key: string) => ReactNode)[],
  keys: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row?: any,
  tableName: string,
}

const TableRow = (props: TableHeaderRowProps) => {
  const { row, keys, renderCels } = props;
  return (
    <tr className={styles.line}>
      {...renderCels!.map((render, i) =>
        <th key={``} className={styles.cell}>
          {render(row![keys[i]])}
        </th>
      )}
    </tr>
  );
};

export default TableRow;