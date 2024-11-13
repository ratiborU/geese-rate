import styles from './adminWidget.module.css'
import image1 from '../../assets/university-svgrepo-com 1.svg'
import image2 from '../../assets/university-svgrepo-com 1 (1).svg'
import { NavLink } from 'react-router-dom';

const AdminWidget = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.title} ${styles.title1}`}>Добро пожаловать,</h1>
      <h1 className={styles.title}>Admin</h1>
      <p className={styles.description}>Функции администратора</p>

      <div className={styles.block}>
        <div className={styles.cart}>
          <div className={styles.cart__title}>
            <img className={styles.image} src={image1} alt="" />
            <p className={styles.text}>Операции с образовательными учереждениями</p>
          </div>
          <NavLink to={`/admin/institutes`}><button className={styles.button}>Открыть рейтинг институтов</button></NavLink>
          {/* <NavLink to={`/admin/institutes/create`}><button className={styles.button}>Создать институт</button></NavLink> */}
        </div>
        <div className={styles.cart}>
          <div className={styles.cart__title}>
            <img className={styles.image} src={image2} alt="" />
            <p className={styles.text}>Операции с Пользователями</p>
          </div>
          <NavLink to={`/admin/users`}><button className={styles.button}>Просмотр пользователей</button></NavLink>
          <NavLink to={`/admin/users/create`}><button className={styles.button}>Создать пользователя</button></NavLink>
          <NavLink to={`/admin/users`}><button className={styles.button}>Просмотр предметов</button></NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminWidget;