<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-x-4 bottom-6 z-50 max-w-xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg rounded-2xl p-4 flex items-center gap-4"
      role="dialog"
      aria-live="polite"
      aria-label="PWA install prompt"
    >
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <img
            src="/icons/pwa-192x192.png"
            alt="App icon"
            class="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <p class="font-semibold text-slate-900">Install Spendee</p>
            <p class="text-sm text-slate-600">
              Add the app to your device for offline access.
            </p>
          </div>
        </div>
      </div>

      <div class="shrink-0 flex gap-2">
        <button
          @click="onInstall"
          class="px-3 py-1.5 rounded-lg font-medium shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1"
          :disabled="installing"
        >
          {{ installing ? 'Installing…' : 'Install' }}
        </button>

        <button
          @click="dismiss"
          class="px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 focus:outline-none"
        >
          Not now
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const STORAGE_KEY = 'spendee_pwa_prompt_dismissed';
const visible = ref(false);
const installEvent = ref(null);
const installing = ref(false);
const dismissed = ref(false);

function showPrompt() {
  if (dismissed.value) return;
  visible.value = true;
}

function hidePrompt() {
  visible.value = false;
}

function dismiss() {
  // save a flag so we don't show prompt again for a while
  localStorage.setItem(STORAGE_KEY, '1');
  dismissed.value = true;
  hidePrompt();
}

async function onInstall() {
  if (!installEvent.value) return;
  try {
    installing.value = true;
    installEvent.value.prompt();
    const choice = await installEvent.value.userChoice;
    installing.value = false;
    hidePrompt();
    // optionally record outcome
    if (choice.outcome === 'accepted') {
      // installed
      localStorage.setItem(STORAGE_KEY, '1');
      dismissed.value = true;
    }
  } catch (err) {
    installing.value = false;
    console.error('Install prompt error', err);
    hidePrompt();
  }
}

function onBeforeInstallPrompt(e) {
  e.preventDefault();
  installEvent.value = e;
  // only show if user hasn't dismissed before
  if (!localStorage.getItem(STORAGE_KEY)) {
    showPrompt();
  }
}

function onAppInstalled() {
  // hide prompt and persist that app is installed
  localStorage.setItem(STORAGE_KEY, '1');
  dismissed.value = true;
  hidePrompt();
}

onMounted(() => {
  // read persisted dismissal
  dismissed.value = !!localStorage.getItem(STORAGE_KEY);

  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  window.addEventListener('appinstalled', onAppInstalled);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  window.removeEventListener('appinstalled', onAppInstalled);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
