<template>
  <aside
    :class="[
      'border-t border-gray-50/10 bg-linear-to-b from-[#143D60] to-[#17594A] transition-all duration-300',
      props.isCollapsed ? 'w-16' : 'w-56',
    ]"
  >
    <!-- Menu -->
    <nav class="mt-4 space-y-2">
      <button
        v-for="item in menu"
        :key="item.id"
        @click="$emit('navigate', item.href)"
        class="flex cursor-pointer items-center gap-2 rounded-xl py-2 pl-1 text-white transition-all duration-300 hover:space-x-1 hover:bg-gray-50/10 active:scale-95"
        :class="[
          props.active === item.id ? 'bg-gray-50/10 font-semibold' : '',
          props.isCollapsed ? 'mx-2 pr-3' : 'mx-4 pr-5',
        ]"
      >
        <span class="transition-all duration-300" />
        <div class="transition-all duration-300">
          <component :is="item.icon" class="h-5 w-5" />
        </div>

        <span v-if="!props.isCollapsed" class="transition-all duration-300">
          {{ item.label }}
        </span>
      </button>
    </nav>

    <!-- Footer -->
    <div
      class="absolute right-0 bottom-0 left-0 border-t border-gray-50/10 p-4"
    >
      <button
        @click="toggle"
        class="flex cursor-pointer items-center gap-2 text-white transition hover:space-x-2 active:scale-95"
      >
        <ChevronLeftIcon
          class="h-5 w-5 duration-300"
          :class="{ 'rotate-180': props.isCollapsed }"
        />
        <span v-if="!props.isCollapsed">Collapse</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ChevronLeftIcon,
  LayoutDashboard,
  LineChart,
  Receipt,
  Settings,
  User,
  Wallet,
} from 'lucide-vue-next';

const props = defineProps({
  active: String,
  isCollapsed: { type: Boolean, default: false },
});

const emit = defineEmits(['update:isCollapsed', 'navigate']);
const toggle = () => emit('update:isCollapsed', !props.isCollapsed);

const menu = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  { id: 'cashflow', label: 'Cashflow', icon: Wallet, href: '/cashflow' },
  { id: 'reports', label: 'Reports', icon: LineChart, href: '/reports' },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: Receipt,
    href: '/transactions',
  },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];
</script>
