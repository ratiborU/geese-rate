import $https from './api';

export type IInstituteRequest = {
  "name": string,
  "abbreviation": string,
  "address": string,
  "rating": string
};

export type IInstituteResponse = {
  "id": string,
  "name": string,
  "abbreviation": string,
  "address": string,
  "rating": string
};


export const InstituteService = {
  async create(data: IInstituteRequest): Promise<IInstituteResponse> {
    const response = await $https.post(`/institutes/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<IInstituteResponse> {
    const response = await $https.get(`/institutes/${id}/`);
    return response.data;
  },

  async getAll(): Promise<IInstituteResponse[]> {
    const response = await $https.get(`/institutes/`);
    return response.data;
  },

  async update(id: string, data: IInstituteRequest): Promise<IInstituteResponse> {
    const response = await $https.put(`/institutes/${id}/`, data);
    return response.data;
  },

  async delete(id: number | string) {
    const response = await $https.delete(`/institutes/${id}/`);
    return response.data;
  },
};