<script setup>
import { computed, onMounted, ref, watch } from "vue";
import DataAnalysisGraph from "../components/DataAnalysisGraph.vue";
import DataDownloadButton from "../components/DataDownloadButton.vue";

const GROUP_TAG = "FHNW-BNE-Projekt";
const BOX_COLOR_PALETTE = [
  "#2563eb",
  "#dc2626",
  "#0f766e",
  "#a16207",
  "#7c3aed",
  "#ea580c",
  "#0e7490",
  "#4d7c0f",
  "#be123c",
  "#1d4ed8",
];
const TIME_RANGES = [
  { id: "1h", label: "Letzte Stunde", windowMinutes: 60, bucketMinutes: 5 },
  {
    id: "6h",
    label: "Letzte 6 Stunden",
    windowMinutes: 360,
    bucketMinutes: 30,
  },
  {
    id: "24h",
    label: "Letzte 24 Stunden",
    windowMinutes: 1440,
    bucketMinutes: 60,
  },
  { id: "3d", label: "Letzte 3 Tage", windowMinutes: 4320, bucketMinutes: 180 },
  {
    id: "7d",
    label: "Letzte 7 Tage",
    windowMinutes: 10080,
    bucketMinutes: 720,
  },
  {
    id: "14d",
    label: "Letzte 14 Tage",
    windowMinutes: 20160,
    bucketMinutes: 1440,
  },
];

const isLoading = ref(false);
const loadError = ref("");
const chartSeries = ref([]);
const selectedRangeId = ref("14d");

const selectedRange = computed(
  () =>
    TIME_RANGES.find((option) => option.id === selectedRangeId.value) ||
    TIME_RANGES[TIME_RANGES.length - 1],
);

const rangeOptions = TIME_RANGES;

function formatBucketLabel(timestampMs, rangeId) {
  const dt = new Date(timestampMs);

  if (rangeId === "1h" || rangeId === "6h" || rangeId === "24h") {
    return dt.toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (rangeId === "3d" || rangeId === "7d") {
    return dt.toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return dt.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function createTimeBuckets(rangeOption) {
  const nowMs = Date.now();
  const stepMs = rangeOption.bucketMinutes * 60 * 1000;
  const fromMs = nowMs - rangeOption.windowMinutes * 60 * 1000;
  const bucketCount = Math.max(1, Math.ceil((nowMs - fromMs) / stepMs));
  const buckets = [];

  for (let i = 0; i < bucketCount; i += 1) {
    const bucketStartMs = fromMs + i * stepMs;
    const bucketEndMs = Math.min(bucketStartMs + stepMs, nowMs);
    buckets.push({
      key: String(bucketStartMs),
      startMs: bucketStartMs,
      endMs: bucketEndMs,
      label: formatBucketLabel(bucketStartMs, rangeOption.id),
    });
  }

  return {
    fromDate: new Date(fromMs).toISOString(),
    toDate: new Date(nowMs).toISOString(),
    fromMs,
    toMs: nowMs,
    stepMs,
    buckets,
  };
}

const timeConfig = computed(() => createTimeBuckets(selectedRange.value));
const chartLabels = computed(() =>
  timeConfig.value.buckets.map((bucket) => bucket.label),
);

async function fetchSensorSeries(box, sensor, config, boxColor) {
  const params = new URLSearchParams({
    "from-date": config.fromDate,
    "to-date": config.toDate,
    format: "json",
  });

  const dataUrl = `https://api.opensensemap.org/boxes/${box._id}/data/${sensor._id}?${params}`;
  const response = await fetch(dataUrl);

  if (!response.ok) {
    throw new Error(
      `Messdaten fuer ${box.name} / ${sensor.title} konnten nicht geladen werden (${response.status}).`,
    );
  }

  const measurements = await response.json();
  const bucketStats = Array.from({ length: config.buckets.length }, () => ({
    sum: 0,
    count: 0,
  }));

  for (const measurement of measurements || []) {
    const value = Number(measurement.value);
    if (!Number.isFinite(value) || !measurement.createdAt) {
      continue;
    }

    const measurementMs = new Date(measurement.createdAt).getTime();
    if (!Number.isFinite(measurementMs)) {
      continue;
    }
    if (measurementMs < config.fromMs || measurementMs > config.toMs) {
      continue;
    }

    const bucketIndex = Math.floor(
      (measurementMs - config.fromMs) / config.stepMs,
    );
    if (bucketIndex < 0 || bucketIndex >= bucketStats.length) {
      continue;
    }

    const stat = bucketStats[bucketIndex];
    stat.sum += value;
    stat.count += 1;
  }

  const values = bucketStats.map((stat) => {
    if (!stat || !stat.count) {
      return null;
    }
    return stat.sum / stat.count;
  });

  const counts = bucketStats.map((stat) => stat?.count || 0);

  return {
    name: `${box.name} - ${sensor.title} (${sensor.unit})`,
    boxId: box._id,
    boxName: box.name,
    sensorId: sensor._id,
    sensorTitle: sensor.title,
    sensorUnit: sensor.unit,
    color: boxColor,
    values,
    counts,
  };
}

async function loadChartData() {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;
  loadError.value = "";

  const config = timeConfig.value;

  try {
    const boxSearchParams = new URLSearchParams({
      grouptag: GROUP_TAG,
      format: "json",
      limit: "20",
    });

    const boxResponse = await fetch(
      `https://api.opensensemap.org/boxes?${boxSearchParams}`,
    );

    if (!boxResponse.ok) {
      throw new Error(
        `Boxen fuer Grouptag ${GROUP_TAG} konnten nicht geladen werden (${boxResponse.status}).`,
      );
    }

    const boxes = await boxResponse.json();

    if (!Array.isArray(boxes) || !boxes.length) {
      throw new Error(`Keine Boxen für Grouptag ${GROUP_TAG} gefunden.`);
    }

    const boxColorMap = new Map(
      boxes.map((box, index) => [
        box._id,
        BOX_COLOR_PALETTE[index % BOX_COLOR_PALETTE.length],
      ]),
    );

    const seriesPromises = [];
    for (const box of boxes) {
      const boxColor = boxColorMap.get(box._id);
      for (const sensor of box.sensors || []) {
        seriesPromises.push(fetchSensorSeries(box, sensor, config, boxColor));
      }
    }
    const allSeries = await Promise.all(seriesPromises);

    const loadedSeries = allSeries.filter((series) =>
      series.values.some(
        (value) => typeof value === "number" && Number.isFinite(value),
      ),
    );

    chartSeries.value = loadedSeries;

    if (!loadedSeries.length) {
      loadError.value = `Es wurden keine Messwerte im Zeitraum ${selectedRange.value.label} gefunden.`;
    }
  } catch (err) {
    console.error(`Error loading chart data:`, err);
    loadError.value = err.message;
    chartSeries.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadChartData();
});

watch(selectedRangeId, () => {
  loadChartData();
});
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-xl font-semibold text-center text-slate-900">
      Datenanalyse
    </h1>
    <p class="text-base leading-7 text-slate-700 text-center">
      Messwerte aller Sensoren im gewählten Zeitraum.
    </p>

    <div class="flex flex-wrap items-end justify-between gap-3">
      <label class="flex flex-col gap-1 text-base text-slate-700">
        Zeitraum
        <select
          v-model="selectedRangeId"
          class="h-10 min-w-52 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-base font-medium text-slate-700"
          :disabled="isLoading"
        >
          <option
            v-for="option in rangeOptions"
            :key="option.id"
            :value="option.id"
          >
            {{ option.label }}
          </option>
        </select>
      </label>

      <button
        type="button"
        class="h-10 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 text-base font-medium text-slate-700"
        :disabled="isLoading"
        @click="loadChartData"
      >
        {{ isLoading ? "Aktualisiere..." : "Neu laden" }}
      </button>
    </div>

    <div
      v-if="isLoading"
      class="rounded-xl bg-slate-50 p-3 text-base text-slate-700"
    >
      Lade Messwerte...
    </div>

    <div
      v-else-if="loadError"
      class="rounded-xl bg-amber-50 p-3 text-base text-amber-800"
    >
      {{ loadError }}
    </div>

    <DataAnalysisGraph v-else :labels="chartLabels" :series="chartSeries" />

    <section
      class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
      aria-label="Diskussion zur Datenanalyse"
    >
      <h2 class="text-base font-semibold text-slate-900">Diskussionsfragen</h2>
      <ol
        class="list-decimal space-y-2 pl-5 text-base leading-7 text-slate-700"
      >
        <li>
          Welche Faktoren können dazu führen, dass gemessene Wert fehler
          aufweisen? Welche konkreten Faktoren sind euch beim Messen
          aufgefallen?
        </li>
        <li>
          Ab wann kann man auf Basis der gemessenen Werte eine verlässliche
          Aussage treffen? Begründe deine Antwort mit Blick auf Anzahl, Streuung
          und Zeitraum der Daten.
        </li>
        <li>
          Welche möglichen Verursacher und Einflussfaktoren der Verschmutzung
          lassen sich aus den Messwerten ableiten (z. B. Industrie)? Nenne
          mindestens zwei und begründe sie mit Daten, falls möglich.
        </li>
        <li>
          Welche Methoden zur zukünftigen Vermeidung von Verschmutzung hältst du
          für sinnvoll (z. B. Verkehrskonzepte, Filtertechnik,
          Verhaltensänderungen)? Recherchiere und ordne jede Methode nach
          erwarteter Wirkung und Umsetzbarkeit.
        </li>
      </ol>
    </section>

    <hr class="border-gray-200" />

    <DataDownloadButton group-tag="FHNW-BNE-Projekt" />
  </section>
</template>
