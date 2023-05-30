import { createWebHistory, createRouter } from 'vue-router';
import Home from './views/Home.vue';
import LoginPage from './views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;