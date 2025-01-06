/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import TableHeaderRow from "./TableHeaderRow";
import TableRow from "./TableRow";
import styles from './table.module.css'


type TableProps = {
  headerLabels: string[],
  renderCels?: ((text: string) => ReactNode)[],
  keys: string[];
  data: any[],
  tableName: string,
}

const Table = (props: TableProps) => {
  const { headerLabels, renderCels, tableName, data, keys } = props;

  return (
    <table className={styles.block}>
      <thead className={styles.thead}>
        <tr className={styles.headerLine}>
          {...headerLabels.map((x, i) => <TableHeaderRow key={`${tableName} ${i}`} label={x} />)}
        </tr>
      </thead>
      <tbody>
        {/* <TableRow/> */}
        {...data.sort((a: any, b: any) => Number(a.id) - Number(b.id))
          .map((x: any) =>
            <TableRow key={x.id} row={x} renderCels={renderCels} keys={keys} />
          )
        }
      </tbody>
    </table>
  );
};

export default Table;