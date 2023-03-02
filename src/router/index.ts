import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Universal from '@/views/UniversalView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Universal,
        props: { page: 'home' },
    },
    {
        path: '/flash-card',
        name: 'flashCard',
        component: Universal,
        props: { page: 'flashCard' },
    },
    {
        path: '/profile',
        name: 'name',
        component: Universal,
        props: { page: 'profile' },
    },
    {
        path: '/add-new',
        name: 'add-new',
        component: Universal,
        props: { page: 'add-new' },
    },
    {
        path: '/random',
        name: 'random',
        component: Universal,
        props: { page: 'random' },
    },
    {
        path: '/konjugation',
        name: 'konjugation',
        component: Universal,
        props: { page: 'konjugation' },
    },
    {
        path: '/dictionary',
        name: 'dictionary',
        component: Universal,
        props: { page: 'dictionary' },
    },
    {
        path: '/search',
        name: 'search',
        component: Universal,
        props: { page: 'search' },
    },
    {
        path: '/category',
        name: 'category',
        component: Universal,
        props: { page: 'category' },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
