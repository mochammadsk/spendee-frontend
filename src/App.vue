<template>
  <div class="min-h-screen">
    <RouterView />
  </div>
</template>

<script setup>
import api from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const res = await api.get('/auth/keep-signed-in');
    if (res.data.success) {
      authStore.setUser(res.data.user);
      authStore.setAuthenticated(true);
    }
  } catch (e) {
    authStore.logout();
  }
});
</script>
