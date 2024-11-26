import $https from './api';

export type ICourseRequest = {
  "name": string,
  "institute": string,
  "teacher": string,
  "schedule": string,
};

export type ICourseResponse = {
  "id": string,
  "name": string,
  "institute": string,
  "teacher": string,
  "schedule": string,
};


export const CourseService = {
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