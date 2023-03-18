import { MessageType } from '@/types/message-types.type';
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
        env: process.env.VUE_APP_ENV || 'stage',
        toast: undefined as { message: string, topic?: MessageType; } | undefined,
        assignment: [],
    }),
    actions: {
        logout() {
            localStorage.clear();
            this.isLogined = false;
        },
        switchEnv() {
            debugger;
            if (this.env === 'stage') {
                this.env = 'prod';
            } else if (this.env === 'prod') {
                this.env = 'dev';
            } else {
                this.env = 'stage';
            }
            this.toast = { message: `env switched to ${this.env}`, topic: 'info' };
        },
    },
    getters: {
        // getError() {
        //     return this.error.;
        // }
    },
});
