type TableProps = {
  headerLabels: string[],

}

const Table = (props: { labels: string[], data: object[] }) => {


  return (
    <table>
      <thead></thead>
      <tbody></tbody>
    </table>
  );
};

export default Table;