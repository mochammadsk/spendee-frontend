<template>
  <div class="bg-gray-50">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import api from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

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
