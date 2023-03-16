import { defineStore } from 'pinia';

export default defineStore('store', {
    state: () => ({
        count: 0,
        isMobileView: window.innerHeight > window.innerWidth,
        isLogined: localStorage.getItem('accessToken') !== null,
        backend_auth_prod: process.env.VUE_APP_AUTH_PROD,
        backend_auth_stage: process.env.VUE_APP_AUTH_STAGE,
        backend_auth_dev: process.env.VUE_APP_AUTH_DEV,
        backend_prod: process.env.VUE_APP_PROD,
        backend_dev: process.env.VUE_APP_DEV,
        backend_stage: process.env.VUE_APP_STAGE,
        env: process.env.VUE_APP_ENV,
        error: undefined as { message: string, topic?: string; } | undefined,
        assignment: [],
    }),
    actions: {
        logout() {
            localStorage.clear();
            this.isLogined = false;
        },
    },
    getters: {
        // getError() {
        //     return this.error.;
        // }
    },
});
