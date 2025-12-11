<template id="main-layout">
  <main class="mx-auto min-h-screen w-full flex-1 bg-gray-300">
    <Header />
    <slot />
  </main>
  <Navbar
    :active="current"
    :isOpen="isOpen"
    @toogle="isOpen = !isOpen"
    @navigate="onNav"
  />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';

const current = ref('dashboard');
const isOpen = ref(false);

defineProps({
  title: { type: String, default: '' },
});

function onNav(page) {
  current.value = page;
}
function openAdd() {}
</script>
