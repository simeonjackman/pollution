<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const chartHeight = 220;
const chartWidth = 320;
const padding = 24;
const maxValue = Math.max(...props.data.map((entry) => entry.value));
const innerWidth = chartWidth - padding * 2;
const innerHeight = chartHeight - padding * 2;
const step = innerWidth / (props.data.length - 1);

const points = props.data
  .map((entry, index) => {
    const x = padding + index * step;
    const y = padding + innerHeight - (entry.value / maxValue) * innerHeight;
    return `${x},${y}`;
  })
  .join(" ");

const areaPoints = `24,196 ${points} 296,196`;
</script>

<template>
  <div
    class="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-3"
  >
    <svg
      viewBox="0 0 320 220"
      class="h-auto w-full"
      role="img"
      aria-label="Line graph with dummy pollution data"
    >
      <defs>
        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <g stroke="rgba(148,163,184,0.18)" stroke-width="1">
        <line x1="24" y1="24" x2="296" y2="24" />
        <line x1="24" y1="78" x2="296" y2="78" />
        <line x1="24" y1="132" x2="296" y2="132" />
        <line x1="24" y1="186" x2="296" y2="186" />
      </g>
      <polyline fill="url(#areaGradient)" stroke="none" :points="areaPoints" />
      <polyline
        fill="none"
        stroke="#22d3ee"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        :points="points"
      />
      <g v-for="(entry, index) in data" :key="entry.label">
        <circle
          :cx="24 + index * (272 / (data.length - 1))"
          :cy="24 + (196 - (entry.value / maxValue) * 172)"
          r="5"
          fill="#e0f2fe"
          stroke="#22d3ee"
          stroke-width="2"
        />
        <text
          :x="24 + index * (272 / (data.length - 1))"
          y="212"
          fill="#cbd5e1"
          font-size="12"
          text-anchor="middle"
        >
          {{ entry.label }}
        </text>
      </g>
    </svg>
  </div>
</template>
