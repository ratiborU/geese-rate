/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import TableHeaderRow from "./TableHeaderRow";
import TableRow from "./TableRow";
import styles from './table.module.css';
import TableLoader from "../TableLoader/TableLoader";


type TableProps = {
  headerLabels: string[],
  renderCels?: ((text: any) => ReactNode)[],
  data: any[],
  tableName: string,
  isFetching?: boolean,
  error?: Error | null
}

const Table = (props: TableProps) => {
  const { headerLabels, renderCels, tableName, data, isFetching = false, error = null } = props;

  if (isFetching) {
    return (
      <>
        <table className={styles.block}>
          <thead className={styles.thead}>
            <tr className={styles.headerLine}>
              {...headerLabels.map((x, i) => <TableHeaderRow key={`${tableName} ${i}`} label={x} />)}
            </tr>
          </thead>
        </table>
        <TableLoader />
      </>
    )
  }

  if (error) {
    return <>Ошибка</>
  }

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