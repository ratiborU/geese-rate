import styles from './mainPageBlock.module.css'
import people from '../../assets/People.png'

const MainPageBlock = (props: { change: (state: boolean) => void; }) => {
  const { change } = props;

  return (
    <div className={styles.wrapper}>
      <p className={styles.text1}>Проект для проектного практикума 2024</p>
      <h1 className={styles.title}>Сервис для оценки учебных занятий</h1>
      <p className={styles.text2}>Инновационная платформа для анализа и оценки учебных занятий, позволяющая улучшить образовательный процесс через обратную связь от студентов и преподавателей</p>
      <button className={styles.button} onClick={() => change(true)}>Войти</button>
      <img className={styles.people} src={people} alt="" />
    </div>
  );
};

export default MainPageBlock;