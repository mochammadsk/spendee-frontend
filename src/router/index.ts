import api from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import Dashboard from '@/views/Dashboard.vue';
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
    meta: {
      title: 'SignIn',
      guestOnly: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta?.title) {
    document.title = String(to.meta.title);
  }

  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      return next();
    }

    try {
      const res = await api.get('/auth/keep-signed-in');

      if (res.data.success) {
        authStore.setAuthenticated(true);
        authStore.setUser(res.data.user);
        return next();
      } else {
        authStore.logout();
        return next({ name: 'signin' });
      }
    } catch (e) {
      authStore.logout();
      return next({ name: 'signin' });
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'dashboard' });
  }

  return next();
});

export default router;
