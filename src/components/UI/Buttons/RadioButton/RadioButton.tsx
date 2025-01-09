import styles from "./radioButton.module.css";
import { InputHTMLAttributes } from 'react';


type InputProps = {
  inputProps?: InputHTMLAttributes<HTMLInputElement>,
  label?: string,
  className?: string,
}

const RadioButton = (props: InputProps) => {
  const { inputProps, label, className } = props;
  return (
    <div className={styles.field}>
      <input
        className={`${styles.input} ${className}`}
        type="radio"
        {...inputProps}
      />
      {label && <label className={styles.label} htmlFor={inputProps?.id}>{label}</label>}
    </div>
  );
};

export default RadioButton;