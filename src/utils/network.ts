import { AxiosRequestConfig } from 'axios';
import useStore from '@/store';
import { init } from './axios-instance';

export default async function <T> (params: {
    path: string,
    method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE',
    svc?: ('auth' | 'svc'),
    body?: any;
    auth?: boolean;
}) {
    const paramSvc = params.svc ? params.svc : 'svc';
    const auth = params.auth ? params.auth : true;
    const method = params.method ? params.method : 'GET';

    const store = useStore();
    const svc: string = (() => {
        switch (store.env) {
            case 'stage': return paramSvc === 'svc' ? store.backend_stage : store.backend_auth_stage;
            case 'dev': return paramSvc === 'svc' ? store.backend_dev : store.backend_auth_dev;
            case 'prod': return paramSvc === 'svc' ? store.backend_prod : store.backend_auth_prod;
            default: return undefined;
        }
    })();

    if (!svc) throw new Error();

    const config: AxiosRequestConfig = {
        method: params.method,
        baseURL: `${svc}`,
        url: `${params.path}`.replaceAll('//', '/'),
        data: method === 'POST' || method === 'PATCH' || method === 'PUT' ? params.body : undefined,
    };
    if (auth) {
        const token = localStorage.getItem('accessToken');
        config.headers = { Authorization: `Bearer ${token}` };
    }

    const axios = init();
    const { data, status } = await axios.request<T>(config);

    if (status === 200 || status === 201) {
        return data as T;
    }
    throw new Error('network error');
}
