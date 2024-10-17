import $https from './api';
import { UserSecretStorageService } from '../lib/helpers/userSecretStorageService.ts';
// import { IAuthRequest } from './model/authTypes.ts';

export type IAuthRequest = {
  username: string;
  password: string;
};

export type IAuthResponse = {
  access: string;
  refresh: string;
};

export type IAuthRefreshRequest = {
  refreshToken: string;
};

export const AuthService = {
    async login(data: IAuthRequest) {
        const response = await $https.post(`/token/`, data);
        UserSecretStorageService.save(response.data);
    },

    async refresh() {
        const response = await $https.post(`/token/refresh/`, {
            refresh: UserSecretStorageService.get()?.refresh,
        });
        UserSecretStorageService.save(response.data);
    },

    async logout() {
        await $https.post(`/auth/logout`, {
            refresh_token: UserSecretStorageService.get()?.refresh,
        });
        UserSecretStorageService.clear();
    },
};