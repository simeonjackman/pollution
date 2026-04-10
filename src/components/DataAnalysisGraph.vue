<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  series: {
    type: Array,
    default: () => [],
  },
});

const activePoint = ref(null);

const chartWidth = 720;
const chartHeight = 300;
const padding = { top: 20, right: 18, bottom: 48, left: 44 };
const innerWidth = chartWidth - padding.left - padding.right;
const innerHeight = chartHeight - padding.top - padding.bottom;

const palette = [
  "#2563eb",
  "#0f766e",
  "#9333ea",
  "#be123c",
  "#c2410c",
  "#475569",
  "#0891b2",
  "#4d7c0f",
  "#7c2d12",
  "#1d4ed8",
  "#b45309",
  "#7e22ce",
];

const cleanedSeries = computed(() =>
  (props.series || []).map((entry, index) => ({
    name: entry.name,
    boxId: entry.boxId || "",
    boxName: entry.boxName || "",
    sensorId: entry.sensorId || "",
    sensorTitle: entry.sensorTitle || "",
    sensorUnit: entry.sensorUnit || "",
    counts: Array.isArray(entry.counts) ? entry.counts : [],
    values: Array.isArray(entry.values) ? entry.values : [],
    color: entry.color || palette[index % palette.length],
  })),
);

const numericValues = computed(() => {
  const values = [];
  for (const item of cleanedSeries.value) {
    for (const value of item.values) {
      if (typeof value === "number" && Number.isFinite(value)) {
        values.push(value);
      }
    }
  }
  return values;
});

const yMin = computed(() => {
  if (!numericValues.value.length) {
    return 0;
  }
  const minValue = Math.min(...numericValues.value);
  return minValue > 0 ? 0 : minValue * 0.9;
});

const yMax = computed(() => {
  if (!numericValues.value.length) {
    return 1;
  }
  const maxValue = Math.max(...numericValues.value);
  return maxValue <= 0 ? 1 : maxValue * 1.1;
});

const yRange = computed(() => {
  const range = yMax.value - yMin.value;
  return range <= 0 ? 1 : range;
});

const xStep = computed(() => {
  const count = props.labels.length;
  if (count <= 1) {
    return innerWidth;
  }
  return innerWidth / (count - 1);
});

function xAt(index) {
  return padding.left + index * xStep.value;
}

function yAt(value) {
  return (
    padding.top +
    innerHeight -
    ((value - yMin.value) / yRange.value) * innerHeight
  );
}

function toPath(values) {
  let path = "";
  let started = false;

  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      started = false;
      continue;
    }

    const command = started ? "L" : "M";
    path += `${command}${xAt(i)},${yAt(value)} `;
    started = true;
  }

  return path.trim();
}

const activePointDetails = computed(() => {
  if (!activePoint.value) {
    return null;
  }

  const { seriesName, index } = activePoint.value;
  const series = cleanedSeries.value.find((item) => item.name === seriesName);
  if (!series) {
    return null;
  }

  const value = series.values[index];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return {
    boxName: series.boxName || "Unbekannte Box",
    sensorTitle: series.sensorTitle || series.name,
    sensorUnit: series.sensorUnit || "",
    sensorId: series.sensorId || "-",
    dateLabel: props.labels[index] || "-",
    value,
    count: series.counts[index] || 0,
    color: series.color,
  };
});

const yTicks = computed(() => {
  const tickCount = 5;
  return Array.from({ length: tickCount }, (_, idx) => {
    const ratio = idx / (tickCount - 1);
    const value = yMax.value - ratio * yRange.value;
    return {
      value,
      y: yAt(value),
    };
  });
});

function shouldShowXAxisLabel(index) {
  const total = props.labels.length;
  if (total <= 2) {
    return true;
  }

  return index % 2 === 0 || index === total - 1;
}

function setActivePoint(seriesName, index) {
  activePoint.value = { seriesName, index };
}

function clearActivePoint() {
  activePoint.value = null;
}
</script>

<template>
  <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
    <svg
      viewBox="0 0 720 300"
      class="h-auto w-full"
      role="img"
      aria-label="Dynamische Messwerte im gewaehlten Zeitraum"
    >
      <g stroke="#e2e8f0" stroke-width="1">
        <line
          v-for="tick in yTicks"
          :key="`grid-${tick.y}`"
          :x1="padding.left"
          :y1="tick.y"
          :x2="chartWidth - padding.right"
          :y2="tick.y"
        />
      </g>

      <g fill="#64748b" font-size="11">
        <text
          v-for="tick in yTicks"
          :key="`label-${tick.y}`"
          x="8"
          :y="tick.y + 4"
        >
          {{ tick.value.toFixed(1) }}
        </text>
      </g>

      <line
        :x1="padding.left"
        :y1="chartHeight - padding.bottom"
        :x2="chartWidth - padding.right"
        :y2="chartHeight - padding.bottom"
        stroke="#94a3b8"
        stroke-width="1"
      />

      <g v-for="(label, index) in labels" :key="`x-${label}-${index}`">
        <text
          v-if="shouldShowXAxisLabel(index)"
          :x="xAt(index)"
          :y="chartHeight - 14"
          fill="#64748b"
          font-size="14"
          text-anchor="middle"
        >
          {{ label }}
        </text>
      </g>

      <g v-for="item in cleanedSeries" :key="item.name">
        <path
          :d="toPath(item.values)"
          fill="none"
          :stroke="item.color"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g v-for="(value, idx) in item.values" :key="`${item.name}-${idx}`">
          <circle
            v-if="typeof value === 'number' && Number.isFinite(value)"
            :cx="xAt(idx)"
            :cy="yAt(value)"
            r="5.5"
            :fill="item.color"
            class="cursor-pointer"
            @click="setActivePoint(item.name, idx)"
          />
        </g>
      </g>
    </svg>

    <div
      v-if="activePointDetails"
      class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800"
    >
      <div class="mb-2 flex items-center gap-2">
        <span
          class="inline-block h-3 w-3 rounded-full"
          :style="{ backgroundColor: activePointDetails.color }"
        ></span>
        <strong>{{ activePointDetails.boxName }}</strong>
      </div>
      <p>
        Sensor: {{ activePointDetails.sensorTitle }}
        <span v-if="activePointDetails.sensorUnit">
          ({{ activePointDetails.sensorUnit }})
        </span>
      </p>
      <p>Datum: {{ activePointDetails.dateLabel }}</p>
      <p>
        Wert: {{ activePointDetails.value.toFixed(2) }}
        <span v-if="activePointDetails.sensorUnit">
          {{ activePointDetails.sensorUnit }}
        </span>
      </p>
      <p>Messungen in diesem Zeitabschnitt: {{ activePointDetails.count }}</p>
      <p class="text-xs text-slate-500">
        Sensor ID: {{ activePointDetails.sensorId }}
      </p>
      <button
        type="button"
        class="mt-2 cursor-pointer text-base font-medium text-slate-600 underline"
        @click="clearActivePoint"
      >
        Auswahl entfernen
      </button>
    </div>
  </div>
</template>
