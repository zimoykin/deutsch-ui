import axios from 'axios';
import useStore from '@/store';

export default async function <T> (params: {
    path: string,
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE',
    svc: ('auth' | 'svc'),
    body?: any;
}) {
    const store = useStore();
    debugger;
    const svc: string = (() => {
        switch (store.env) {
            case 'stage': return params.svc === 'svc' ? store.backend_stage : store.backend_auth_stage;
            case 'dev': return params.svc === 'svc' ? store.backend_dev : store.backend_auth_dev;
            case 'prod': return params.svc === 'svc' ? store.backend_prod : store.backend_auth_prod;
            default: return undefined;
        }
    })();

    if (!svc) throw new Error();

    const { data } = await axios.request<T>({
        method: params.method,
        url: `${svc}/${params.path}`.replaceAll('//', '/'),
        data: params.method === 'POST' || params.method === 'PATCH' || params.method === 'PUT' ? params.body : undefined,
    });

    return data as T;
}
