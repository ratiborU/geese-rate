import $https from './api';

export type ICoupleRequest = {
  "institute": string,
  "course": string,
  "teacher": string,
  "topic": string,
  "address": string,
  "room": string,
  "date": string,
  "time": string,
  // "average_rating": string,
  // "total_reviews": string,
};

export type ICoupleResponse = {
  "id": string,
  "institute": string,
  "course": string,
  "teacher": string,
  "topic": string,
  "address": string,
  "room": string,
  "date": string,
  "time": string,
  "average_rating": string,
  "total_reviews": string,
};


export const CoupleService = {
  async create(data: ICoupleRequest): Promise<ICoupleResponse> {
    const response = await $https.post(`/lessons/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<ICoupleResponse> {
    const response = await $https.get(`/lessons/${id}/`);
    return response.data;
  },

  async getAll(): Promise<ICoupleResponse[]> {
    const response = await $https.get(`/lessons/`);
    return response.data;
  },

  async update(id: string, data: ICoupleRequest): Promise<ICoupleResponse> {
    const response = await $https.put(`/lessons/${id}/`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await $https.delete(`/lessons/${id}/`);
    return response.data;
  },
};