import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // component: () => import('layouts/NavBar.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },
  {
    path: '/login',
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/roles',
    // component: () => import('layouts/NavBar.vue'),
    children: [{ path: '', component: () => import('pages/RolesPage.vue') }],
  },
  {
    path: '/profil',
    // component: () => import('layouts/NavBar.vue'),
    children: [{ path: '', component: () => import('pages/ProfilPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
