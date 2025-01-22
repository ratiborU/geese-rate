import $https from './api';

export type IQrRequest = {
  "link": string,
  "expiration_time": string,
  "time_unit": "seconds" | "minutes" | "hours"
};

export type IQrResponse = {
  "qr_key": string,
  "qr_code_url": string,
  "expiration_time": string
};


export const QrService = {
  async create(data: IQrRequest): Promise<IQrResponse> {
    const response = await $https.post(`/qr/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<IQrResponse> {
    const response = await $https.get(`/qr/${id}/`);
    return response.data;
  },

  async getAll(): Promise<IQrResponse[]> {
    const response = await $https.get(`/qr/`);
    return response.data;
  },

  async update(id: string, data: IQrRequest): Promise<IQrResponse> {
    const response = await $https.put(`/qr/${id}/`, data);
    return response.data;
  },

  async delete(id: number | string) {
    const response = await $https.delete(`/qr/${id}/`);
    return response.data;
  },
};