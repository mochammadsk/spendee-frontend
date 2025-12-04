<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui';
import { ref } from 'vue';

const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'text',
    label: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
]);
</script>

<template>
  <UAuthForm
    title="Login"
    description="Enter your credentials to access your account."
    :fields="fields"
    class="max-w-md"
  />
</template>
