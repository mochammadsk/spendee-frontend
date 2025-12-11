<template>
  <span
    :class="[
      'inline-block animate-spin rounded-full border-2 border-t-transparent',
      sizeClasses[size],
      colorClasses[variant],
    ]"
  />
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
  },
  variant: {
    type: String,
    default: 'light',
  },
});

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const colorClasses = {
  light: 'border-white',
  dark: 'border-gray-700',
  primary: 'border-indigo-600',
};
</script>
