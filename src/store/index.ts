import { defineStore } from 'pinia';

export default defineStore('store', {
    state: () => ({
        count: 0,
        isMobileView: window.innerHeight > window.innerWidth,
        isLogined: false,
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
