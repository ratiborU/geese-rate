import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'

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
      {!isPending ?
        <>{text}</> :
        <div className={styles.loader} style={{ left: width / 2 - 20 }}>
          <svg className={styles.circularLoader} viewBox='25 25 50 50'>
            <circle className={styles.loaderPath} cx='50' cy='50' r='20' fill="none"></circle>
          </svg>
        </div>
      }

    </button>
  );
};

export default Button;