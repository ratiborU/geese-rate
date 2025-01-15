import { IReviewResponse } from "../../../services/reviewsService"

export type IReviewResponseChecked = {
  id: string;
  user: string;
  lesson: string;
  rating: string;
  comment: string;
  advantages: string[];
  is_anonymous: string;
  created_at: string;
  checked: boolean;
}

export const getDataWithCheckboxes = (data: IReviewResponse[]): IReviewResponseChecked[] => {
  // console.log(data);

  return data.map(x => ({ ...x, checked: true }))
}