import { SelectHTMLAttributes } from 'react';
import styles from './selectInput.module.css'

type TOption = {
  value: string,
  text: string,
}

type SelectProps = {
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>,
  label?: string,
  options: TOption[],
  text?: string
}


const SelectInput = (props: SelectProps) => {
  const { selectProps, label, options, text = 'Выберите один из вариантов...' } = props;
  return (
    <div className={styles.field}>
      {label && <label className={styles.label} htmlFor={selectProps?.id}>{label}</label>}
      <select
        className={styles.select}
        {...selectProps}
      >
        <option selected disabled hidden value="">{text}</option>
        {...options?.map((x) =>
          <option selected={selectProps?.defaultValue == x.value} value={x.value}>{x.text}</option>
        )}
      </select>
    </div>
  );
};

export default SelectInput;