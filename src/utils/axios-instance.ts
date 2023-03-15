/* eslint-disable */
import useStore from '@/store';
import axios, { AxiosInstance } from 'axios';

let instance: AxiosInstance;

export function init(): AxiosInstance {
    if (instance) {
        return instance;
    }

    const store = useStore();

    const axiosApiInstance = axios.create();

    instance = axiosApiInstance;

    const refreshAccessToken = async (): Promise<{ accessToken: string; refreshToken: string; }> => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken != null) {
            const { data } = await axios.post<{ accessToken: string; refreshToken: string; }>(`${store.backend_auth_stage}/auth/refresh`, { refreshToken });
            return data;
        }
        throw new Error('refresh token not found');
    };

    instance.interceptors.response.use((resp) => {
        console.log(resp);
        return resp;
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { accessToken, refreshToken } = await refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
    });

    return axiosApiInstance;
}
