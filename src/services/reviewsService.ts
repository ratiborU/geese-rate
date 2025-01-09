import $https from './api';

export type ICourseRequest = {
  "user": string,
  "lesson": string,
  "rating": string,
  "comment": string,
  "advantages": string[],
  "is_anonymous": string,
};

export type ICourseResponse = {
  "id": string,
  "user": string,
  "lesson": string,
  "rating": string,
  "comment": string,
  "advantages": string[],
  "is_anonymous": string,
};


export const ReviewService = {
  async create(data: ICourseRequest): Promise<ICourseResponse> {
    const response = await $https.post(`/reviews/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<ICourseResponse> {
    const response = await $https.get(`/reviews/${id}/`);
    return response.data;
  },

  async getAll(): Promise<ICourseResponse[]> {
    const response = await $https.get(`/reviews/`);
    return response.data;
  },

  async update(id: string, data: ICourseRequest): Promise<ICourseResponse> {
    const response = await $https.put(`/reviews/${id}/`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await $https.delete(`/reviews/${id}/`);
    return response.data;
  },
};