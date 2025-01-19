import axios from 'axios';
// import { UserSecretStorageService } from '../lib/helpers/userSecretStorageService';
// import { AuthService } from './authService';

const $http = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

// $http.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._isRetry) {
//       if (originalRequest.url == '/token/refresh/') {
//         window.location.href = '/login';
//       }
//       originalRequest._isRetry = true;
//       await AuthService.refresh();
//       return $http.request(originalRequest);
//     }
//     throw error;
//   },
// );

// $http.interceptors.request.use((config) => {
//   const token = UserSecretStorageService.get()?.access;
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

export default $http;