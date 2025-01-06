import styles from "./input.module.css";
import { InputHTMLAttributes } from 'react';


type InputProps = {
  inputProps?: InputHTMLAttributes<HTMLInputElement>,
  label?: string,
  className?: string,
}

const Input = (props: InputProps) => {
  const { inputProps, label, className } = props;
  return (
    <div className={styles.field}>
      {label && <label className={styles.label} htmlFor={inputProps?.id}>{label}</label>}
      <input
        className={`${styles.input} ${className}`}
        {...inputProps}
      />
    </div>
  );
};

export default Input;