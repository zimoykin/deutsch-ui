// /* eslint-disable */
// import axios, { AxiosInstance } from 'axios';
// /* eslint-disable */
// import jsonApi from './jsonApi';

// let instance: AxiosInstance;

// export function init(): AxiosInstance {
//     if (instance) {
//         return instance;
//     }

//     const axiosApiInstance = axios.create();

//     instance = axiosApiInstance;

//     const refreshAccessToken = async (): Promise<{ accessToken: string; refreshToken: string; }> => {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (refreshToken != null) {
//             const [data] = jsonApi<{ accessToken: string; refreshToken: string; }>({
//                 method: 'POST', backend: 'auth-svc', body: { refreshToken }, path: 'auth/refresh',
//             }).toPromise();
//             return data.then((data) => ({
//                 accessToken: data.accessToken,
//                 refreshToken: data.refreshToken,
//             })).catch((err) => {
//                 throw new Error('refresh token not found');
//             });
//         }
//         throw new Error('refresh token not found');
//     };

//     /** eslint-disabled */
//     instance.interceptors.response.use((resp) => {
//         console.log(resp);
//         return resp;
//     }, async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const { accessToken, refreshToken } = await refreshAccessToken();
//             originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);
//             return axiosApiInstance(originalRequest);
//         }
//         return Promise.reject(error);
//     });

//     return axiosApiInstance;
// }
