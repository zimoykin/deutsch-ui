import axios, { AxiosRequestConfig } from 'axios';
import useStore from '@/store';

export default async function <T> (params: {
    path: string,
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE',
    svc: ('auth' | 'svc'),
    body?: any;
    auth?: boolean;
}) {
    const store = useStore();
    const svc: string = (() => {
        switch (store.env) {
            case 'stage': return params.svc === 'svc' ? store.backend_stage : store.backend_auth_stage;
            case 'dev': return params.svc === 'svc' ? store.backend_dev : store.backend_auth_dev;
            case 'prod': return params.svc === 'svc' ? store.backend_prod : store.backend_auth_prod;
            default: return undefined;
        }
    })();

    if (!svc) throw new Error();

    const config: AxiosRequestConfig = {
        method: params.method,
        url: `${svc}/${params.path}`.replaceAll('//', '/'),
        data: params.method === 'POST' || params.method === 'PATCH' || params.method === 'PUT' ? params.body : undefined,
    };
    if (params.auth) {
        const token = localStorage.getItem('accessToken');
        config.headers = { Authorization: `Bearer ${token}` };
    }

    const { data } = await axios.request<T>(config);

    return data as T;
}
