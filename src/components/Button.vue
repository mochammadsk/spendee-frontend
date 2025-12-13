<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'flex w-full cursor-pointer justify-center rounded-md font-medium duration-300 hover:scale-[1.02] focus:outline-none active:scale-95 disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as () =>
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'neutral',
    default: 'primary',
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
});

const variantClasses = {
  primary: 'text-white bg-indigo-600',
  secondary: 'text-white bg-gray-600',
  success: 'text-white bg-green-600',
  danger: 'text-white bg-red-600',
  neutral: 'text-gray-700 bg-white border border-gray-300',
};

const sizeClasses = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-5 text-base',
};
</script>
