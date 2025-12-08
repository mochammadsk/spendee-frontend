<script setup>
import Button from '@/components/Button.vue';
import Spinner from '@/components/Spinner.vue';
import api from '@/lib/api';
import { Eye, EyeOff } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  remember: false,
});

const errors = reactive({
  email: '',
  password: '',
  general: '',
});

const submitting = ref(false);
const showPassword = ref(false);

function validate() {
  errors.email = '';
  errors.password = '';
  errors.general = '';

  if (!form.email) errors.email = 'Email / Username wajib diisi.';
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
  errors.general = '';

  try {
    const payload = {
      identifier: form.email,
      password: form.password,
    };

    const res = await api.post('/auth/signin', payload);
    const { token, data } = res.data;

    router.push({ name: 'dashboard' });
  } catch (err) {
    if (err.response) {
      const status = err.response.status;

      if (status === 400) errors.general = 'Field wajib diisi.';
      else if (status === 401)
        errors.general = 'Email/Username atau password salah.';
      else if (status === 403) errors.general = 'Akun belum terverifikasi.';
      else errors.general = 'Terjadi kesalahan, coba lagi nanti.';
    } else {
      errors.general = 'Tidak dapat terhubung ke server.';
    }
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <img
        class="mx-auto h-24 w-auto"
        src="/public/icons/icon.png"
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
              autocomplete="email"
              required
              v-model.trim="form.email"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email or Username"
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
                class="absolute inset-y-0 right-0 pr-3 flex cursor-pointer outline-none items-center"
                aria-label="Toggle password visibility"
              >
                <Eye
                  v-if="!showPassword"
                  class="w-5 h-5 text-gray-500 hover:text-gray-700 transition"
                />
                <EyeOff
                  v-else
                  class="w-5 h-5 text-gray-500 hover:text-gray-700 transition"
                />
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
          <Button variant="primary" type="submit" :disabled="submitting">
            <span v-if="!submitting">Login</span>
            <span v-else class="flex items-center gap-2">
              <Spinner size="sm" variant="light" />
              Processing...
            </span>
          </Button>
        </div>
      </form>

      <p class="text-center text-sm text-gray-500">
        Don't have an account?
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
          >Sign Up</a
        >
      </p>
    </div>
  </div>
</template>
