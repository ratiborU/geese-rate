import $https from './api';

export type ICourseRequest = {
  "user": string,
  "course": string,
  "rating": string,
  "comment": string,
  "is_anonymous": string,
};

export type ICourseResponse = {
  "id": string,
  "user": string,
  "course": string,
  "rating": string,
  "comment": string,
  "is_anonymous": string,
};


export const ReviewService = {
  async create(data: ICourseRequest): Promise<ICourseResponse> {
    const response = await $https.post(`/courses/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<ICourseResponse> {
    const response = await $https.get(`/courses/${id}/`);
    return response.data;
  },

  async getAll(): Promise<ICourseResponse[]> {
    const response = await $https.get(`/courses/`);
    return response.data;
  },

  async update(id: string, data: ICourseRequest): Promise<ICourseResponse> {
    const response = await $https.put(`/courses/${id}/`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await $https.delete(`/courses/${id}/`);
    return response.data;
  },
};