import styles from './titleWidget.module.css'
type TitleWidgetProps = {
  title: string,
  description?: string,
  image?: string
}

const TitleWidget = (props: TitleWidgetProps) => {
  const { title, description, image } = props
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {image && <img className={styles.image} src={image} alt="" />}
    </div>
  );
};

export default TitleWidget;