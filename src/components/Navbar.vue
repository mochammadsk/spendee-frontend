<template>
  <nav
    class="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-full items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm sm:left-1/2 sm:max-w-2xl sm:-translate-x-1/2 sm:px-6 md:px-10"
  >
    <!-- Dashboard -->
    <button
      @click="navigate('dashboard')"
      class="flex w-1/5 cursor-pointer flex-col items-center justify-center gap-1 transition duration-200 active:scale-95"
      :class="
        active === 'dashboard'
          ? 'font-semibold text-blue-600'
          : 'text-slate-600'
      "
    >
      <House class="h-6 w-6" />
      <span class="text-xs">Dashboard</span>
    </button>

    <!-- Wallet -->
    <button
      @click="navigate('wallet')"
      class="flex w-1/5 cursor-pointer flex-col items-center justify-center gap-1 transition duration-200 active:scale-95"
      :class="
        active === 'wallet' ? 'font-semibold text-blue-600' : 'text-slate-600'
      "
    >
      <Wallet class="h-6 w-6" />
      <span class="text-xs">Wallet</span>
    </button>

    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="h-18.5 w-18.5 -translate-y-5 rounded-full bg-gray-200"></div>
    </div>

    <!-- Center Add / Toggle -->
    <button
      @click="toggle"
      class="relative z-10 -mt-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition active:scale-95"
    >
      <component :is="isOpen ? X : Plus" class="h-7 w-7" />
    </button>

    <!-- Activity -->
    <button
      @click="navigate('activity')"
      class="flex w-1/5 cursor-pointer flex-col items-center justify-center gap-1 transition duration-200 active:scale-95"
      :class="
        active === 'activity' ? 'font-semibold text-blue-600' : 'text-slate-600'
      "
    >
      <History class="h-6 w-6" />
      <span class="text-xs">Activity</span>
    </button>

    <!-- Menu/Profile -->
    <button
      @click="navigate('menu')"
      class="flex w-1/5 cursor-pointer flex-col items-center justify-center gap-1 transition duration-200 active:scale-95"
      :class="
        active === 'menu' ? 'font-semibold text-blue-600' : 'text-slate-600'
      "
    >
      <Menu class="h-6 w-6" />
      <span class="text-xs">Menu</span>
    </button>
  </nav>
</template>

<script setup>
import { History, House, Menu, Plus, Wallet, X } from 'lucide-vue-next'
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  active: { type: String, default: 'dashboard' },
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['toogle', 'navigate'])

function navigate(page) {
  emit('navigate', page)
}

function toggle() {
  emit('toogle')
}
</script>
