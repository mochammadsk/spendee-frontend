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

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'rounded-md font-medium focus:outline-none disabled:opacity-50 cursor-pointer w-full flex justify-center active:scale-95 duration-300 hover:scale-[1.02]',
      variantClasses[variant],
      sizeClasses[size],
    ]"
  >
    <slot />
  </button>
</template>
