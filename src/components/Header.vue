<template>
  <div
    class="space-y-4 rounded-b-3xl bg-linear-to-b from-sky-500 via-sky-700 to-indigo-900 p-4 pb-6"
  >
    <div class="flex items-center justify-between">
      <div class="grid text-white">
        <h1 class="text-xl font-bold">Halo, {{ name }}</h1>
        <div class="flex items-center gap-1 text-sm">
          <Calendar class="h-3 w-3" />
          <span>{{ today }}</span>
        </div>
      </div>
      <div class="text-white">
        <Bell class="h-5 w-5" />
      </div>
    </div>

    <div
      class="grid items-center space-y-4 rounded-xl border border-gray-100/70 bg-gray-100/20 p-4 text-white"
    >
      <div class="grid">
        <div class="flex justify-between">
          <h1 class="text-md">Total Saldo</h1>
          <button
            type="button"
            class="cursor-pointer text-white duration-200 active:scale-95"
            @click="toggleBalance"
            :title="showBalance ? 'Hide Balance' : 'Show Balance'"
          >
            <Eye v-if="!showBalance" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <p class="text-2xl font-semibold">{{ balance }}</p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex gap-2 p-2">
          <div class="rounded-lg bg-green-500/20 p-2 text-green-500">
            <TrendingDown class="h-6 w-6" />
          </div>

          <div class="grid">
            <h2 class="text-sm">Pemasukan</h2>
            <span class="text-xs">{{ balance }}</span>
          </div>
        </div>

        <div class="flex gap-2 p-2">
          <div class="rounded-lg bg-red-500/20 p-2 text-red-500">
            <TrendingUp class="h-6 w-6" />
          </div>

          <div class="grid">
            <h2 class="text-sm">Pengeluaran</h2>
            <span class="text-xs">{{ balance }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {
  Bell,
  Calendar,
  Eye,
  EyeOff,
  TrendingDown,
  TrendingUp,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';

const name = ref('');
const token = Cookies.get('token');
if (token) {
  try {
    const decoded = jwtDecode(token);
    name.value = decoded.full_name;
  } catch (err) {
    console.error('Token invalid:', err);
  }
}

const showBalance = ref(false);
function toggleBalance() {
  showBalance.value = !showBalance.value;
}

function formatRupiah(amount) {
  if (typeof amount !== 'number') return amount;
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
}

const rawBalance = ref(100000);
const balance = computed(() => {
  if (showBalance.value) {
    return formatRupiah(rawBalance.value);
  }
  return '••••••';
});

const today = new Date().toLocaleDateString('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
</script>
