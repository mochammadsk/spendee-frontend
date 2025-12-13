<template>
  <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
    <!-- Left Side -->
    <div
      class="hidden flex-col items-center justify-center bg-linear-to-b from-[#143D60] to-[#17594A] px-12 text-white lg:flex"
    >
      <img src="/icons/icon.webp" class="mb-8 w-56" alt="Logo" />
      <h1 class="mb-3 text-4xl font-bold">Spendeefy</h1>
      <p class="max-w-sm text-center text-indigo-200">
        {{ $t('auth.description') }}
      </p>
    </div>

    <!-- Right Side: Slot for Signin / Signup -->
    <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-6">
        <!-- Header Mobile -->
        <div class="text-center lg:hidden">
          <img src="/icons/icon.webp" class="mx-auto mb-4 h-20" />
          <h2 class="text-3xl font-semibold text-gray-900">Spendeefy</h2>
        </div>

        <!-- Page Content -->
        <slot />

        <!-- Language Switch -->
        <div class="flex justify-center">
          <div class="relative w-40" ref="langDropdown">
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

            <div
              v-if="showLangMenu"
              class="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-lg bg-white shadow"
            >
              <button
                @click="changeLang('id')"
                class="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Indonesia
              </button>
              <button
                @click="changeLang('en')"
                class="w-full px-4 py-2 text-left hover:bg-gray-100"
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
import { ChevronDown, Globe } from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const langDropdown = ref<HTMLElement | null>(null);
const showLangMenu = ref(false);

function changeLang(lang: string) {
  locale.value = lang;
  localStorage.setItem('locale', lang);
  showLangMenu.value = false;
}

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
</script>
