// import React from 'react';
import styles from "./header.module.css";
import logo from "../../assets/logo_urfu.svg"
import search from "../../assets/SearchButton.svg"
import arrowDown from "../../assets/Галочка.svg"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__element}>
        <img className={styles.logo} src={logo} alt="" />
        <img className={styles.search} src={search} alt="" />

        <nav className={styles.navigation}>
          <button className={styles.button}>
            <span className={styles.buttonText}>Кнопка</span>
            <img className={styles.arrowDown} src={arrowDown} alt="" />
          </button>
          <button className={styles.button}>
            <span className={styles.buttonText}>Кнопка</span>
            <img className={styles.arrowDown} src={arrowDown} alt="" />
          </button>
          <button className={styles.button}>
            <span className={styles.buttonText}>Кнопка</span>
            <img className={styles.arrowDown} src={arrowDown} alt="" />
          </button>
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