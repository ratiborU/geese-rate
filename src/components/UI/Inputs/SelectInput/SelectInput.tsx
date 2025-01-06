import { SelectHTMLAttributes } from 'react';
import styles from './selectInput.module.css'

type SelectProps = {
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>,
  label?: string,
}

const SelectInput = (props: SelectProps) => {
  const { selectProps, label } = props;
  return (
    <div className={styles.field}>
      {label && <label className={styles.label} htmlFor={selectProps?.id}>{label}</label>}
      <select
        className={styles.select}
        {...selectProps}
      >
        <option value="">Выберите роль...</option>
        <option value="admin">Администратор</option>
        <option value="teacher">Преподаватель</option>
      </select>
    </div>
  );
};

export default SelectInput;