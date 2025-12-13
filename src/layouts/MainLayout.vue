<template id="main-layout">
  <div class="flex min-h-screen flex-col">
    <Header :collapsed="isSidebarCollapsed" />

    <div class="flex flex-1 overflow-hidden">
      <Sidebar
        :active="current"
        v-model:isCollapsed="isSidebarCollapsed"
        @navigate="onNav"
        class="hidden lg:block"
      />

      <main
        :class="[
          'flex-1 transition-all duration-300',
          isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0',
        ]"
      >
        <slot />
      </main>
    </div>

    <!-- Mobile Navbar -->
    <Navbar
      :active="current"
      :isOpen="isOpen"
      @toogle="isOpen = !isOpen"
      @navigate="onNav"
      class="lg:hidden"
    />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/main/Header.vue';
import Navbar from '@/components/main/Navbar.vue';
import Sidebar from '@/components/main/Sidebar.vue';
import { ref } from 'vue';

const current = ref('dashboard');
const isSidebarCollapsed = ref(false);
const isOpen = ref(false);

function onNav(page: string) {
  current.value = page;
}
</script>
