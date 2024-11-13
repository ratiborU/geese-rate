import React from 'react';
import styles from './mainPageBlock.module.css'
import people from '../../assets/People.png'
import pattern from '../../assets/Pattern.png'
import gradient from '../../assets/Gradient.png'
import menu from '../../assets/Menu.png'

const MainPageBlock = (props: { change: (state: boolean) => void; }) => {
  const { change } = props;

  return (
    <div className={styles.wrapper}>
      <p className={styles.text1}>Проект для проектного практикума 2024</p>
      <h1 className={styles.title}>Сервис для оценки учебных занятий</h1>
      <p className={styles.text2}>Инновационная платформа для анализа и оценки учебных занятий, позволяющая улучшить образовательный процесс через обратную связь от студентов и преподавателей</p>
      <button className={styles.button} onClick={() => change(true)}>Войти</button>
      <img className={styles.people} src={people} alt="" />

      {/* <img className={styles.gradient} src={gradient} alt="" /> */}
      {/* <img className={styles.menu} src={menu} alt="" /> */}
      {/* <img className={styles.pattern} src={pattern} alt="" /> */}
      {/* <LoginModal /> */}
    </div>
  );
};

export default MainPageBlock;