import styles from "./header.module.css";
import logo from "../../assets/logo_urfu.svg"
// import search from "../../assets/SearchButton.svg"
// import arrowDown from "../../assets/Галочка.svg"
import { NavLink } from "react-router-dom";
import { LocalStorageService } from "../../lib/helpers/localStorageService";
import { IUserResponse } from "../../services/userService";
// import { useState } from "react";

const Header = () => {
  const user: IUserResponse | null = LocalStorageService.get('user');
  return (
    <header className={styles.header}>
      <div className={styles.header__element}>
        <NavLink to='/'>
          <img className={styles.logo} src={logo} alt="" />
        </NavLink>

        <nav className={styles.navigation}>
          {/* {user?.role == 'admin' &&
            <NavLink to='/admin' >
              <button className={styles.button}>
                <span className={styles.buttonText}>Панель</span>
              </button>
            </NavLink>
          }
          {user?.role == 'teacher' &&
            <NavLink to='/teacher' >
              <button className={styles.button}>
                <span className={styles.buttonText}>Преподаватель</span>
              </button>
            </NavLink>
          } */}
          <NavLink to='/admin' >
            <button className={styles.button}>
              <span className={styles.buttonText}>Панель</span>
            </button>
          </NavLink>
          <NavLink to='/teacher' >
            <button className={styles.button}>
              <span className={styles.buttonText}>Преподаватель</span>
            </button>
          </NavLink>



        </nav>
      </div>

      <div className={styles.header__element}>
        <button className={styles.button}>
          {/* ФИО */}
          <span className={styles.buttonText}>{user?.first_name || 'Войти'}</span>
        </button>
      </div>

    </header>
  );
};

export default Header;