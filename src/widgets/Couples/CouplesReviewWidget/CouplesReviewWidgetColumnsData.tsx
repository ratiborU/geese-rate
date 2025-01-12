import { useQuery } from "@tanstack/react-query";
import { CoupleService } from "../../../services/coupleService";
import { IReviewResponse } from "../../../services/reviewsService";
import { parseDateTime } from "../../../lib/helpers/parseDateTime";

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
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await CoupleService.getOne(Number(text.lesson));
        return institute
      },
      queryKey: ["couplesData", text.lesson],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.topic} </>
  },
  (text: IReviewResponse) => <>{text.rating}</>,
  (text: IReviewResponse) => <>{text.comment}</>,
  (text: IReviewResponse) => <>{text.advantages}</>,
  // (text: IReviewResponse) => <>{text.is_anonymous ? 'Анонимно' : 'не анонимно'}</>,
  (text: IReviewResponse) => <>{parseDateTime(text.created_at)}</>,
];
