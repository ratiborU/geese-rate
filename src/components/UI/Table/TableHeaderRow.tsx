import styles from './table.module.css'

type TableHeaderRowProps = {
  label: string;
}

const TableHeaderRow = (props: TableHeaderRowProps) => {
  const { label } = props;
  return (
    <th className={styles.headerCell}>{label}</th>
  );
};

export default TableHeaderRow;