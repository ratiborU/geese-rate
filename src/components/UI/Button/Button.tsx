import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'
import Loader from '../Loader/Loader';

type ButtonProps = {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>,
  className?: string,
  text: string,
  width?: number,
  isPending?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = (props: ButtonProps) => {
  const { text, width = 300, isPending = false, onClick = () => { }, className, buttonProps } = props;
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      {...buttonProps}
      style={{ width }}
    >
      {isPending ?
        <>{text}</> :
        <Loader />
      }

    </button>
  );
};

export default Button;