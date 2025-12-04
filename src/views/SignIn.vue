<script setup>
import Button from '@/components/Button.vue';
import { reactive, ref } from 'vue';

const form = reactive({
  email: '',
  password: '',
  remember: false,
});

const errors = reactive({
  email: '',
  password: '',
});

const submitting = ref(false);
const showPassword = ref(false);

function validate() {
  errors.email = '';
  errors.password = '';

  if (!form.email) errors.email = 'Email wajib diisi.';
  else if (!/^\S+@\S+\.\S+$/.test(form.email))
    errors.email = 'Format email tidak valid.';

  if (!form.password) errors.password = 'Password wajib diisi.';
  else if (form.password.length < 6)
    errors.password = 'Password minimal 6 karakter.';

  return !errors.email && !errors.password;
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

async function onSubmit() {
  if (!validate()) return;
  submitting.value = true;

  // Simulasi request: ganti dengan fetch/axios ke API Anda
  try {
    await new Promise((r) => setTimeout(r, 900));
    // contoh: const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(form) })
    // handle token, redirect, dsb.
    alert('Berhasil sign in (simulasi).');
  } catch (err) {
    alert('Terjadi kesalahan. Coba lagi.');
  } finally {
    submitting.value = false;
  }
}

function onOAuth(provider) {
  alert(`OAuth: ${provider} (simulasi)`);
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <img
        class="mx-auto h-24 w-auto"
        src="/public/icons/pwa-512x512.png"
        alt="Logo"
      />

      <form
        class="mt-8 space-y-6 bg-white p-6 rounded-2xl shadow-sm"
        @submit.prevent="onSubmit"
      >
        <div>
          <h2 class="text-center text-3xl font-bold text-gray-900">SignIn</h2>
        </div>
        <input type="hidden" name="remember" :value="form.remember" />

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model.trim="form.email"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="you@example.com"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                autocomplete="current-password"
                required
                v-model="form.password"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <span class="text-gray-500">{{
                  showPassword ? 'Hide' : 'Show'
                }}</span>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-600">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              v-model="form.remember"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900"
              >Remember me</label
            >
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >Forgot your password?</a
            >
          </div>
        </div>

        <div>
          <Button variant="primary"> Login </Button>
        </div>
      </form>

      <p class="text-center text-sm text-gray-500">
        Don't have an account?
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
          >Sign up</a
        >
      </p>
    </div>
  </div>
</template>
