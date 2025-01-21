import styles from "./header.module.css";
import logo from "../../assets/logo_urfu.svg"
import { NavLink } from "react-router-dom";
import { LocalStorageService } from "../../lib/helpers/localStorageService";
import { IUserResponse } from "../../services/userService";
import { useAuthContext } from "../../providers/AuthContextProvider/hooks/useAuthContext";
import LoginModal from "../LoginModal/LoginModal";
import { useState } from "react";

const Header = () => {
  const user: IUserResponse | null = LocalStorageService.get('user');
  const auth = useAuthContext();

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__element}>
          <NavLink to='/'>
            <img className={styles.logo} src={logo} alt="" />
          </NavLink>

          <nav className={styles.navigation}>
            {auth.role == 'admin' &&
              <NavLink to='/admin' >
                <button className={styles.button}>
                  <span className={styles.buttonText}>Панель</span>
                </button>
              </NavLink>
            }
            {auth.role == 'teacher' &&
              <NavLink to='/teacher' >
                <button className={styles.button}>
                  <span className={styles.buttonText}>Преподаватель</span>
                </button>
              </NavLink>
            }
          </nav>
        </div>

        <div className={styles.header__element}>
          <button className={styles.button} onClick={() => setIsVisible(true)}>
            {/* ФИО */}
            <span className={styles.buttonText}>{user?.first_name || 'Войти'}</span>
          </button>
        </div>

      </header>
      <LoginModal isVisible={isVisible} change={() => setIsVisible(false)} />
    </>

  );
};

export default Header;