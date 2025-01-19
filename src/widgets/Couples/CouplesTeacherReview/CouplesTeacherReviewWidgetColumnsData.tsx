import { parseDateTime } from "../../../lib/helpers/parseDateTime";
import RadioButton from "../../../components/UI/Buttons/RadioButton/RadioButton";
import { IReviewResponseChecked } from "./checkBoxData";
export const tableName = 'Lessons';

export const headerLabels = [
  '',
  'Отметка посещаемости',
  'ФИО',
  'Дата',
];



export const renderCels = [
  (text: IReviewResponseChecked) => {
    return <RadioButton
      inputProps={{
        type: 'checkbox',
        defaultChecked: true,
        onClick: () => text.checked = !text.checked
      }}
    />
  },

  (text: IReviewResponseChecked) => <>{text.user}</>,
  (text: IReviewResponseChecked) => <>{parseDateTime(text.created_at)}</>,
];


