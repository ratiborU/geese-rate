import styles from './tableLoader.module.css'

type LoaderProps = {
  color?: string
}

const TableLoader = (props: LoaderProps) => {
  const { color = "#000000" } = props;
  return (
    <div className={styles.loader} >
      <svg className={styles.circularLoader} viewBox='25 25 50 50'>
        <circle
          className={styles.loaderPath}
          cx='50' cy='50' r='20'
          fill="none"
          style={{
            stroke: color
          }}></circle>
      </svg>
    </div>
  );
};

export default TableLoader;