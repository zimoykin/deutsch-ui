import { defineStore } from 'pinia';

export default defineStore('store', {
    state: () => ({
        count: 0,
        isMobileView: window.innerHeight > window.innerWidth,
        isLogined: localStorage.getItem('accessToken') !== null,
        // backend_auth_prod: import.meta.env.VITE_BACKEND_AUTH_PROD,
        // backend_auth_stage: import.meta.env.VITE_BACKEND_AUTH_STAGE,
        // backend_auth_dev: import.meta.env.VITE_BACKEND_AUTH_DEV,
        // backend: import.meta.env.VITE_BACKEND_SVC_PROD,
        // backend_dev: import.meta.env.VITE_BACKEND_SVC_DEV,
        // backend_stage: import.meta.env.VITE_BACKEND_SVC_STAGE,
    }),
    actions: {
        // isMobile() {
        //     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //         return true;
        //     }
        //     return false;
        // },
        logout() {
            localStorage.clear();
            this.isLogined = false;
        },
    },
});
