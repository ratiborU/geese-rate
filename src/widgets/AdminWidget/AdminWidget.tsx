import styles from './adminWidget.module.css'
import image1 from '../../assets/university-svgrepo-com 1.svg'
import image2 from '../../assets/university-svgrepo-com 1 (1).svg'
import LinkButton from '../../components/UI/LinkButton/LinkButton';

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
          <LinkButton text='Открыть рейтинг институтов' to='/admin/institutes' width={380} />
        </div>
        <div className={styles.cart}>
          <div className={styles.cart__title}>
            <img className={styles.image} src={image2} alt="" />
            <p className={styles.text}>Операции с Пользователями</p>
          </div>
          <div className={styles.buttons}>
            <LinkButton text='Просмотр пользователей' to='/admin/users' width={380} />
            <LinkButton text='Создать пользователя' to='/admin/users/create' width={380} />
            <LinkButton text='Просмотр предметов' to='/admin/courses' width={380} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminWidget;