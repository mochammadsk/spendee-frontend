<template>
  <div class="grid min-h-screen grid-cols-1 bg-gray-50 lg:grid-cols-2">
    <!-- Left Side -->
    <div
      class="hidden flex-col items-center justify-center bg-indigo-600 px-12 text-white lg:flex"
    >
      <img src="/icons/icon.webp" class="mb-8 w-56" alt="Logo" />
      <h1 class="mb-3 text-4xl font-bold">Spendeefy</h1>
      <p class="max-w-sm text-center text-indigo-200">
        {{ $t('auth.description') }}
      </p>
    </div>

    <!-- Right Side -->
    <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-6">
        <!-- Header Mobile -->
        <div class="text-center lg:hidden">
          <img src="/icons/icon.webp" class="mx-auto mb-4 h-20" />
          <h2 class="text-3xl font-semibold text-gray-900">Spendeefy</h2>
        </div>

        <!-- Login Card -->
        <div class="rounded-2xl bg-white p-8 shadow">
          <h2 class="mb-6 text-center text-2xl font-semibold text-gray-900">
            {{ $t('auth.login') }}
          </h2>

          <form class="space-y-5" @submit.prevent="onSubmit">
            <input type="hidden" name="remember" :value="form.remember" />

            <!-- Email -->
            <div>
              <input
                v-model.trim="form.email"
                type="text"
                class="w-full rounded-lg border px-4 py-2 focus:outline-none"
                placeholder="Email or Username"
              />
              <p v-if="errors.email" class="mt-1 text-xs text-red-500">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  class="w-full rounded-lg border px-4 py-2 pr-10 focus:outline-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-3 flex items-center"
                >
                  <Eye v-if="!showPassword" class="h-5 w-5 text-gray-500" />
                  <EyeOff v-else class="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-xs text-red-500">
                {{ errors.password }}
              </p>
            </div>

            <!-- Remember + Forgot -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  v-model="form.remember"
                  class="rounded border-gray-300 text-indigo-600"
                />
                {{ $t('auth.rememberMe') }}
              </label>

              <a href="#" class="text-indigo-600 hover:underline">
                {{ $t('auth.forgotPassword') }}
              </a>
            </div>

            <!-- Button -->
            <Button variant="primary" type="submit" :disabled="submitting">
              <span v-if="!submitting">{{ $t('auth.login') }}</span>
              <span v-else class="flex items-center gap-2">
                <Spinner size="sm" variant="light" />
                Processing...
              </span>
            </Button>
          </form>
        </div>

        <!-- Register -->
        <p class="text-center text-sm text-gray-600">
          {{ $t('auth.noAccount') }}
          <a href="#" class="font-medium text-indigo-600 hover:underline">
            {{ $t('auth.register') }}
          </a>
        </p>

        <!-- Language Switch -->
        <div class="flex justify-center">
          <div class="relative w-40" ref="langDropdown">
            <!-- Button -->
            <button
              type="button"
              @click.stop="showLangMenu = !showLangMenu"
              class="flex w-full cursor-pointer items-center justify-between gap-2 border-b border-gray-300 px-3 py-2 text-sm text-gray-500"
            >
              <div class="flex items-center gap-2">
                <Globe class="h-4 w-4" />
                <span>{{ locale === 'id' ? 'Indonesia' : 'English' }}</span>
              </div>
              <ChevronDown
                class="h-4 w-4 transition-transform"
                :class="showLangMenu ? 'rotate-180' : ''"
              />
            </button>

            <!-- Dropdown -->
            <div
              v-if="showLangMenu"
              class="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-lg bg-white shadow"
            >
              <button
                type="button"
                @click="changeLang('id')"
                class="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
              >
                Indonesia
              </button>
              <button
                type="button"
                @click="changeLang('en')"
                class="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import Spinner from '@/components/Spinner.vue';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import { ChevronDown, Eye, EyeOff, Globe } from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const toast = useToast();
const { locale, t } = useI18n();
const authStore = useAuthStore();

const langDropdown = ref<HTMLElement | null>(null);
const showLangMenu = ref(false);
const showPassword = ref(false);
const submitting = ref(false);
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

// toggle password
function togglePassword() {
  showPassword.value = !showPassword.value;
}

// language menu
function changeLang(lang: string) {
  locale.value = lang;
  localStorage.setItem('locale', lang);
  showLangMenu.value = false;
}

// handle click outside
function handleClickOutside(e: MouseEvent) {
  const target = e.target as Node;
  if (langDropdown.value && !langDropdown.value.contains(target)) {
    showLangMenu.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

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
    const { data } = res.data;

    authStore.setUser(data);

    toast.success(t('toast.successLogin'), {
      position: 'top',
      duration: 2500,
    });

    router.push({ name: 'dashboard' });
  } catch (err: any) {
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

    toast.error(errors.general, {
      position: 'top',
      duration: 2500,
    });
  } finally {
    submitting.value = false;
  }
}
</script>
