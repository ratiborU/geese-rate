import styles from './loader.module.css'

type LoaderProps = {
  color?: string
}

const Loader = (props: LoaderProps) => {
  const { color = "#ffffff" } = props;
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

export default Loader;