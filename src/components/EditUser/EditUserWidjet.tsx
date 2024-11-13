// import React from 'react';
import styles from './editUserWidjet.module.css'

const EditUserWidjet = () => {
  return (
    <div className={styles.block}>
      <h1>Редактировать пользователя</h1>
      <form className={styles.form} action="">
        <input className={styles.input} type="text" placeholder='first_name' defaultValue='имя' />
        <input className={styles.input} type="text" placeholder='last_name' defaultValue='фамилия' />
        <input className={styles.input} type="text" placeholder='username' />
        <input className={styles.input} type="text" placeholder='email' />
        <input className={styles.input} type="text" placeholder='password' />
        <input className={styles.input} type="text" placeholder='role' />
        <button>Создать</button>
      </form>
    </div>
  );
};

export default EditUserWidjet;