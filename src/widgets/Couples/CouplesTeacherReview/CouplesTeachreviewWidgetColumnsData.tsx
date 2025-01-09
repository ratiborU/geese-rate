import { useQuery } from "@tanstack/react-query";
import { CoupleService } from "../../../services/coupleService";

export const tableName = 'Lessons';

export const headerLabels = [
  '',
  'ФИО',
  'Предмет',
  'Оценка',
  'Комментарий',
  'Примущества',
  'Анонимно',
  'Дата',
];

export const keys = [
  'user',
  'lesson',
  'rating',
  'comment',
  'advantages',
  'is_anonymous',
  'created_at',
];

export const renderCels = [
  (text: string) => <>{text}</>,
  (text: string) => {
    const { data, isLoading, error } = useQuery({
      queryFn: async () => {
        const institute = await CoupleService.getOne(Number(text));
        return institute
      },
      queryKey: ["couplesData", text],
    });
    if (isLoading) {
      return 'Загрузка...'
    }
    if (error) {
      return 'No data'
    }
    return <>{data?.topic} </>
  },
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text}</>,
  (text: string) => <>{text ? 'Анонимно' : 'не анонимно'}</>,
  (text: string) => <>{text}</>,
];
