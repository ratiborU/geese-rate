import React from 'react';
import styles from './createUserWidjet.module.css'

const CreateUserWidjet = () => {
  return (
    <div className={styles.block}>
      <h1>Создать пользователя</h1>
      <form className={styles.form} action="">
        <input className={styles.input} type="text" placeholder='first_name' />
        <input className={styles.input} type="text" placeholder='last_name' />
        <input className={styles.input} type="text" placeholder='username' />
        <input className={styles.input} type="text" placeholder='email' />
        <input className={styles.input} type="text" placeholder='password' />
        <input className={styles.input} type="text" placeholder='role' />
        <button>Создать</button>
      </form>
    </div>
  );
};

export default CreateUserWidjet;