<template>
  <div
    class="flex items-center rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-md"
  >
    <div class="flex items-center gap-4" :class="textColor">
      <component :is="icon" class="h-8 w-8" :class="iconColor" />

      <div>
        <h1 class="text-xl font-semibold text-gray-800">{{ title }}</h1>
        <span :class="iconColor">{{ formattedValue }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { currencyFormater } from '@/utils/currencyFormater';
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  value: number;
  icon: any;
  iconColor: string;
  textColor?: string;
}>();

const formattedValue = computed(() => currencyFormater(props.value));
</script>
