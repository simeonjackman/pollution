<script setup>
import DataAnalysisGraph from "../components/DataAnalysisGraph.vue";
import DataDownloadButton from "../components/DataDownloadButton.vue";

const monthlyData = [
  { label: "Jan", value: 18 },
  { label: "Feb", value: 26 },
  { label: "Mar", value: 22 },
  { label: "Apr", value: 34 },
  { label: "May", value: 29 },
  { label: "Jun", value: 41 },
];
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-xl font-semibold text-center text-slate-900">
      Data Analysis
    </h1>
    <p class="text-sm leading-6 text-slate-700">
      The chart below shows dummy pollution values over six months.
    </p>

    <DataAnalysisGraph :data="monthlyData" />

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <div
        v-for="entry in monthlyData"
        :key="entry.label"
        class="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-gray-500">
          {{ entry.label }}
        </p>
        <p class="mt-1 text-lg font-semibold text-slate-900">
          {{ entry.value }}
        </p>
      </div>
    </div>

    <hr class="border-gray-200" />

    <DataDownloadButton group-tag="FHNW-BNE-Projekt" />
  </section>
</template>
