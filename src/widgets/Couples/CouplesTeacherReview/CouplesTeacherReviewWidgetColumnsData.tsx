import { parseDateTime } from "../../../lib/helpers/parseDateTime";
import RadioButton from "../../../components/UI/Buttons/RadioButton/RadioButton";
import { IReviewResponseChecked } from "./checkBoxData";
import styles from './couplesTeacherReviewWidget.module.css'

export const tableName = 'Lessons';

export const headerLabels = [
  '',
  'Отметка посещаемости',
  'ФИО',
  'Дата',
];



export const renderCels = [
  (text: IReviewResponseChecked) => {
    return <div className={styles.radioButton}>
      <RadioButton
        label=""
        inputProps={{
          type: 'checkbox',
          id: `students checkbox ${text.id}`,
          defaultChecked: true,
          onClick: () => text.checked = !text.checked
        }}
      />
    </div>
  },

  (text: IReviewResponseChecked) => <>{text.user}</>,
  (text: IReviewResponseChecked) => <>{parseDateTime(text.created_at)}</>,
];


