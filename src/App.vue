<template>
  <div class="min-h-screen">
    <RouterView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
