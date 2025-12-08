<script setup lang="ts">
import Button from '@/components/Button.vue';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  try {
    await api.post('/auth/signout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    authStore.logout();
    router.replace('/signin');
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 px-4">
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-md px-6 py-8 flex flex-col items-center text-center space-y-4"
    >
      <div
        class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl"
      >
        🛠️
      </div>

      <h1 class="text-xl font-semibold text-slate-800">
        Halaman dalam Tahap Pengembangan
      </h1>

      <p class="text-sm text-slate-500">
        Fitur ini masih dalam proses pengerjaan. Silakan kembali lagi nanti atau
        kembali ke halaman utama.
      </p>

      <div class="mt-4 w-full">
        <Button type="button" @click="handleLogout">Kembali</Button>
      </div>

      <p class="text-[11px] text-slate-400 mt-2">
        Status:
        <span class="font-medium text-amber-500">Tahap Pengembangan</span>
      </p>
    </div>
  </div>
</template>
