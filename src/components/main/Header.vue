<template>
  <header
    class="flex items-center justify-between bg-linear-to-r from-[#143D60] to-[#17594A] px-4 text-white transition-all duration-300"
    :class="collapsed ? 'h-12' : 'h-16'"
  >
    <div class="flex items-center gap-3">
      <img
        src="/icons/icon.webp"
        alt="logo"
        class="transition-all duration-300"
        :class="collapsed ? 'w-8' : 'w-10'"
      />

      <h1
        v-if="!collapsed"
        class="text-xl font-semibold transition-all duration-300"
      >
        Spendee
      </h1>
    </div>

    <!-- RIGHT: Date + Notification -->
    <div class="flex items-center gap-4">
      <div class="border-r border-white/50 pr-4">
        <span class="text-sm">{{ today }}</span>
      </div>

      <button
        class="flex cursor-pointer rounded-full border border-white p-1.5 hover:scale-105 active:scale-95"
      >
        <Bell class="h-4 w-4" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { Bell } from 'lucide-vue-next';

const props = defineProps({
  collapsed: Boolean,
});

const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
</script>
