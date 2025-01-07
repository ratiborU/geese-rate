'use client'
import { ButtonHTMLAttributes } from 'react';
import styles from './linkButton.module.css'
import { NavLink } from 'react-router-dom';

type LinkButtonProps = {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>,
  text: string,
  to: string,
  width?: number,
  className?: string,
}

const LinkButton = (props: LinkButtonProps) => {
  const { text, width = 300, to, buttonProps } = props;
  return (
    <NavLink className={styles.link} to={to} >
      <button
        className={styles.button}
        {...buttonProps}
        style={{ width }}
      >
        {text}
      </button>
    </NavLink>
  );
};

export default LinkButton;