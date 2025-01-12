import $https from './api';

export type IReviewRequest = {
  "user": string,
  "lesson": string,
  "rating": string,
  "comment": string,
  "advantages": string[],
  "is_anonymous": string,
};

export type IReviewResponse = {
  "id": string,
  "user": string,
  "lesson": string,
  "rating": string,
  "comment": string,
  "advantages": string[],
  "is_anonymous": string,
  "created_at": string,
};


export const ReviewService = {
  async create(data: IReviewRequest): Promise<IReviewResponse> {
    const response = await $https.post(`/reviews/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<IReviewResponse> {
    const response = await $https.get(`/reviews/${id}/`);
    return response.data;
  },

  async getAll(): Promise<IReviewResponse[]> {
    const response = await $https.get(`/reviews/`);
    return response.data;
  },

  async update(id: string, data: IReviewRequest): Promise<IReviewResponse> {
    const response = await $https.put(`/reviews/${id}/`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await $https.delete(`/reviews/${id}/`);
    return response.data;
  },
};