/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import TableHeaderRow from "./TableHeaderRow";
import TableRow from "./TableRow";
import styles from './table.module.css'


type TableProps = {
  headerLabels: string[],
  renderCels?: ((text: any) => ReactNode)[],
  data: any[],
  tableName: string,
}

const Table = (props: TableProps) => {
  const { headerLabels, renderCels, tableName, data } = props;

  return (
    <table className={styles.block}>
      <thead className={styles.thead}>
        <tr className={styles.headerLine}>
          {...headerLabels.map((x, i) => <TableHeaderRow key={`${tableName} ${i}`} label={x} />)}
        </tr>
      </thead>
      <tbody>
        {...data.sort((a: any, b: any) => Number(a.id) - Number(b.id))
          .map((x: any) =>
            <TableRow
              key={`${tableName} row ${x.id}`} row={x}
              renderCels={renderCels}
              tableName={tableName}
            />
          )
        }
      </tbody>
    </table>
  );
};

export default Table;