import styles from "./header.module.css";
import logo from "../../assets/logo_urfu.svg"
import search from "../../assets/SearchButton.svg"
import arrowDown from "../../assets/Галочка.svg"
import { NavLink } from "react-router-dom";

const Header = () => {
  // navigate('/admin', { state: { from: location }, replace: true });
  return (
    <header className={styles.header}>
      <div className={styles.header__element}>
        <NavLink to='/'>
          <img className={styles.logo} src={logo} alt="" />
        </NavLink>
        <img className={styles.search} src={search} alt="" />

        <nav className={styles.navigation}>
          <NavLink to='/admin' >
            <button className={styles.button}>
              <span className={styles.buttonText}>Панель</span>
              <img className={styles.arrowDown} src={arrowDown} alt="" />
            </button>
          </NavLink>

        </nav>
      </div>

      <div className={styles.header__element}>
        <button className={styles.button}>
          <span className={styles.buttonText}>Войти</span>
        </button>
        <div className={styles.profile}></div>
      </div>

    </header>
  );
};

export default Header;