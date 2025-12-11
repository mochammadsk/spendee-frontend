<script setup lang="ts">
import Button from '@/components/Button.vue';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const handleLogout = async () => {
  try {
    await api.post('/auth/signout');
    toast.success('Logout berhasil.', {
      position: 'top',
      duration: 2500,
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    authStore.logout();
    router.replace('/signin');
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4">
    <div
      class="flex w-full max-w-md flex-col items-center space-y-4 rounded-2xl bg-white px-6 py-8 text-center shadow-md"
    >
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl"
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

      <p class="mt-2 text-[11px] text-slate-400">
        Status:
        <span class="font-medium text-amber-500">Tahap Pengembangan</span>
      </p>
    </div>
  </div>
</template>
