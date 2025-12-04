import SignIn from '@/views/SignIn.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/signin',
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: { title: 'SignIn' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
