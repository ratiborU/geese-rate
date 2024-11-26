import $https from './api';

export type ICourseRequest = {
  "course": string,
  "average_rating": string,
  "total_reviews": string,
  "last_updated": string,
};

export type ICourseResponse = {
  "id": string,
  "course": string,
  "average_rating": string,
  "total_reviews": string,
  "last_updated": string,
};


export const RatingService = {
  async create(data: ICourseRequest): Promise<ICourseResponse> {
    const response = await $https.post(`/ratings/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<ICourseResponse> {
    const response = await $https.get(`/ratings/${id}/`);
    return response.data;
  },

  async getAll(): Promise<ICourseResponse[]> {
    const response = await $https.get(`/ratings/`);
    return response.data;
  },

  async update(id: string, data: ICourseRequest): Promise<ICourseResponse> {
    const response = await $https.put(`/ratings/${id}/`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await $https.delete(`/ratings/${id}/`);
    return response.data;
  },
};