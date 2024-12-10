// Убрать эту парашу потом
/* eslint-disable @typescript-eslint/no-unused-vars */
import $https from './api';

export type ICoupleRequest = {
  "course": string,
  "date": string,
  "status": string,
  "qr": string,
};

export type ICoupleResponse = {
  "id": string,
  "course": string,
  "teacher": string,
  "date": string,
  "status": string,
  "qr": string,
};
// <th className={styles.cell}>id</th>
//           <th className={styles.cell}>Предмет</th>
//           <th className={styles.cell}>Дата проведения</th>
//           <th className={styles.cell}>Статус</th>
//           <th className={styles.cell}>Ссылка на QR</th>
//           <th className={styles.cell}>Список студентов</th>
const mockData = {
  data: [
    {
      "id": '1',
      "course": '1',
      "teacher": '2',
      "date": "10.12.2024 - 14:15",
      "status": "Проведено",
      "qr": "http://shvbskskdjfhksdjhf",
    },
    {
      "id": '2',
      "course": '1',
      "teacher": '2',
      "date": "12.12.2024 - 14:15",
      "status": "Идет",
      "qr": "http://shvbskskdjfhksdjhf",
    },
    {
      "id": '3',
      "course": '1',
      "teacher": '2',
      "date": "17.12.2024 - 14:15",
      "status": "Запланированно",
      "qr": "http://shvbskskdjfhksdjhf",
    },
    {
      "id": '4',
      "course": '1',
      "teacher": '2',
      "date": "19.12.2024 - 14:15",
      "status": "Запланированно",
      "qr": "http://shvbskskdjfhksdjhf",
    }
  ]
}


export const CoupleService = {
  async create(data: ICoupleRequest): Promise<ICoupleResponse> {
    // const response = await $https.post(`/courses/`, data);
    const response = mockData;
    return response.data[1];
  },

  async getOne(id: number): Promise<ICoupleResponse> {
    // const response = await $https.get(`/courses/${id}/`);
    const response = mockData;
    return response.data[1];
  },

  async getAll(): Promise<ICoupleResponse[]> {
    // const response = await $https.get(`/courses/`);
    const response = mockData;
    return response.data;
  },

  async update(id: string, data: ICoupleRequest): Promise<ICoupleResponse> {
    // const response = await $https.put(`/courses/${id}/`, data);
    const response = mockData;
    return response.data[1];
  },

  async delete(id: number) {
    // const response = await $https.delete(`/courses/${id}/`);
    const response = mockData;
    return response.data[1];
  },
};