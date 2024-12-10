import styles from './titleWidget.module.css'

const TitleWidget = (props: { title: string; description: string }) => {
  const { title, description } = props
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.input}>{description}</p>
    </div>
  );
};

export default TitleWidget;