<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
});

const variantClasses = {
  primary: 'text-white bg-indigo-600 hover:bg-indigo-700',
  secondary: 'text-white bg-gray-600 hover:bg-gray-700',
  success: 'text-white bg-green-600 hover:bg-green-700',
  danger: 'text-white bg-red-600 hover:bg-red-700',
  neutral: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100',
};

const sizeClasses = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-5 text-base',
};
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'rounded-md font-medium focus:outline-none disabled:opacity-50 cursor-pointer w-full flex justify-center active:scale-95 duration-300 hover:translate-y-0.5',
      variantClasses[variant],
      sizeClasses[size],
    ]"
  >
    <slot />
  </button>
</template>
