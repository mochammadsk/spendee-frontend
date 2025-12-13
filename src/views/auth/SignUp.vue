<template>
  <AuthLayout>
    <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <!-- form signup -->
    </div>

    <p class="text-center text-sm text-gray-600">
      {{ $t('auth.haveAccount') }}
      <RouterLink
        :to="{ name: 'signin' }"
        class="font-medium text-indigo-600 hover:underline"
      >
        {{ $t('auth.login') }}
      </RouterLink>
    </p>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
</script>
