'use client'
import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'

type ButtonProps = {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>,
  className?: string,
  text: string,
  width?: number,
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = (props: ButtonProps) => {
  const { text, width = 300, onClick = () => { }, className, buttonProps } = props;
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      {...buttonProps}
      style={{ width }}>
      {text}
    </button>
  );
};

export default Button;