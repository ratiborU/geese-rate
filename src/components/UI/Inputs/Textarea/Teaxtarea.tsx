import styles from "./textarea.module.css";
import { TextareaHTMLAttributes } from 'react';


type InputProps = {
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>,
  label?: string,
  className?: string,
}

const Textarea = (props: InputProps) => {
  const { inputProps, label, className } = props;
  return (
    <div className={styles.field}>
      {label && <label className={styles.label} htmlFor={inputProps?.id}>{label}</label>}
      <textarea
        className={`${styles.input} ${className}`}
        {...inputProps}
      ></textarea>
    </div>
  );
};

export default Textarea;