import { IReviewResponse } from "../../../services/reviewsService";
import { parseDateTime } from "../../../lib/helpers/parseDateTime";
import { useGetOneCoupleQuery } from "../../../hooks/couples/useGetOneCoupleQuery";
import Loader from "../../../components/UI/Loader/Loader";

export const tableName = 'Lessons';

export const headerLabels = [
  '',
  'ФИО',
  'Предмет',
  'Оценка',
  'Комментарий',
  'Примущества',
  // 'Анонимно',
  'Дата',
];


export const renderCels = [
  (text: IReviewResponse) => <>{text.is_anonymous ? '-' : text.user}</>,
  (text: IReviewResponse) => {
    const { data, isFetching, error } = useGetOneCoupleQuery(Number(text.lesson));

    if (isFetching) {
      return <Loader color={'#000000'} />
    }
    if (error) {
      return '-'
    }
    return <>{data?.topic} </>
  },
  (text: IReviewResponse) => <>{text.rating}</>,
  (text: IReviewResponse) => <>{text.comment}</>,
  (text: IReviewResponse) => <>{text.advantages}</>,
  // (text: IReviewResponse) => <>{text.is_anonymous ? 'Анонимно' : 'не анонимно'}</>,
  (text: IReviewResponse) => <>{parseDateTime(text.created_at)}</>,
];
