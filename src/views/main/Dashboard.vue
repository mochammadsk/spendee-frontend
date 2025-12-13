<template>
  <MainLayout title="Dashboard">
    <div class="space-y-4 p-4">
      <div class="grid grid-cols-4 justify-between gap-4">
        <SummaryCard
          title="Total Saldo"
          :value="saldo"
          :icon="Wallet2"
          iconColor="text-blue-500"
        />
        <SummaryCard
          title="Total Pemasukan"
          :value="saldo"
          :icon="TrendingUp"
          iconColor="text-green-500"
        />
        <SummaryCard
          title="Total Pengeluaran"
          :value="saldo"
          :icon="TrendingDown"
          iconColor="text-red-500"
        />
        <SummaryCard
          title="Total Tabungan"
          :value="saldo"
          :icon="HandCoins"
          iconColor="text-yellow-500"
        />
      </div>

      <div class="rounded-lg bg-white p-4 shadow">
        <h2 class="mb-4 text-lg font-semibold">Income vs Expense (30 days)</h2>
        <apexchart
          width="100%"
          height="300"
          type="line"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import SummaryCard from '@/components/main/dashboard/SummaryCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { HandCoins, TrendingDown, TrendingUp, Wallet2 } from 'lucide-vue-next';
import { ref } from 'vue';

const saldo = 100000;

const series = ref([
  {
    name: 'Income',
    data: [500000, 650000, 800000, 400000, 900000, 1000000, 700000],
  },
  {
    name: 'Expense',
    data: [300000, 450000, 500000, 300000, 700000, 650000, 400000],
  },
]);

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
  },
  colors: ['#16a34a', '#dc2626'],
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  xaxis: {
    categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  },
  yaxis: {
    labels: {
      formatter: (value: number) => 'Rp ' + value.toLocaleString('id-ID'),
    },
  },
});
</script>
