import $https from './api';

export type IUserRequest = {
  "password": string,
  "username": string,
  "first_name": string,
  "last_name": string,
  "email": string,
  "role": "student" | "admin" | "teacher"
};

export type IUserResponse = {
  "id": string,
  "password": string,
  "username": string,
  "first_name": string,
  "last_name": string,
  "email": string,
  "role": string
};


export const UserService = {
  async create(data: IUserRequest): Promise<IUserResponse> {
    const response = await $https.post(`/users/`, data);
    return response.data;
  },

  async getOne(id: number): Promise<IUserResponse> {
    const response = await $https.get(`/users/${id}/`);
    return response.data;
  },

  async getAll(): Promise<IUserResponse[]> {
    const response = await $https.get(`/users/`);
    return response.data;
  },

  async update(id: string, data: IUserResponse): Promise<IUserResponse> {
    const response = await $https.put(`/users/${id}/`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await $https.delete(`/users/${id}/`);
    return response.data;
  },
};