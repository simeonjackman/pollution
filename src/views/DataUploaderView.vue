<template>
  <div class="space-y-4 text-black">
    <h2 class="text-xl font-semibold text-center">BNE Projekt FHNW:</h2>
    <h3 class="text-xl font-semibold text-center">Messwerte erfassen</h3>

    <button
      @click="showMap = !showMap"
      class="h-12 w-full rounded-xl bg-blue-800 text-base text-white"
    >
      {{ showMap ? "🗺️ Karte ausblenden" : "🗺️ Karte anzeigen" }}
    </button>
    <div v-if="showMap" class="rounded-xl overflow-hidden">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1TYjb8TRF-nGwMc1B2ohctL2elBCGF4w&hl=de&ehbc=2E312F"
        width="100%"
        height="480"
        style="border: 0"
        allowfullscreen
      ></iframe>
    </div>

    <div>
      <label class="block text-lg font-medium mb-2">Wo wird gemessen?</label>
      <div class="grid grid-cols-1 gap-4">
        <button
          type="button"
          @click="senseBoxId = '10'"
          :class="[
            'h-12 rounded-2xl border-2 px-4 text-base font-semibold',
            senseBoxId === '10'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-800 text-white border-gray-300',
          ]"
        >
          🌲 Wald
        </button>
        <button
          type="button"
          @click="senseBoxId = '69cf906291c0af00075e44e3'"
          :class="[
            'h-12 rounded-2xl border-2 px-4 text-base font-semibold',
            senseBoxId === '69cf906291c0af00075e44e3'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-800 text-white border-gray-300',
          ]"
        >
          🚗 Strasse
        </button>
        <button
          type="button"
          @click="senseBoxId = '92'"
          :class="[
            'h-12 rounded-2xl border-2 px-4 text-base font-semibold',
            senseBoxId === '92'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-800 text-white border-gray-300',
          ]"
        >
          🏠 Siedlungsgebiet
        </button>
      </div>
    </div>

    <div v-if="senseBoxId">
      <label class="block text-lg font-medium mb-2">Was wird gemessen?</label>
      <select v-model="sensorId" class="w-full border rounded-xl p-3 text-base">
        <option disabled value="">Wähle...</option>
        <option
          v-for="sensor in SENSOR_MAP[senseBoxId]"
          :key="sensor.id"
          :value="sensor.id"
        >
          {{ sensor.name }}
        </option>
      </select>
    </div>

    <div v-if="sensorId">
      <label class="block text-sm font-medium mb-1">Messwert</label>
      <input
        v-model.number="value"
        type="number"
        inputmode="decimal"
        class="w-full border rounded-xl p-3 text-base"
        placeholder="Messwert eingeben"
      />
    </div>

    <button
      v-if="senseBoxId && sensorId && value !== null"
      @click="submit"
      class="h-12 w-full rounded-xl bg-green-600 text-base text-white"
    >
      Messung einreichen
    </button>

    <div
      v-if="status"
      :class="[
        'rounded-xl p-3 text-sm',
        status.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800',
      ]"
    >
      {{ status.message }}
    </div>

    <hr class="border-gray-200" />

    <button
      @click="downloadData"
      class="h-12 w-full rounded-xl bg-gray-700 text-base text-white"
    >
      ⬇️ Alle Daten dieses Projekts Herunterladen
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const senseBoxId = ref("");
const sensorId = ref("");
const value = ref(null);
const status = ref(null);

const showMap = ref(false);

const BOX_IDS = ["10", "25", "92"];

const SENSOR_MAP = {
  10: [
    { name: "Luftverschmutzung (AQI)", id: "aqi_10" },
    { name: "Lärmverschmutzung (db)", id: "noise_10" },
    { name: "Elektrisches Feld (nT)", id: "efield_10" },
    { name: "Magnetisches Feld (nT)", id: "bfield_10" },
    { name: "CO2 (ppm)", id: "co2_10" },
  ],
  "69cf906291c0af00075e44e3": [
    { name: "Luftverschmutzung (AQI)", id: "69cf906291c0af00075e44e4" },
    { name: "Lärmverschmutzung (db)", id: "69cf906291c0af00075e44e5" },
    { name: "Elektrisches Feld (nT)", id: "69cf906291c0af00075e44e6" },
    { name: "Magnetisches Feld (nT)", id: "69cf906291c0af00075e44e7" },
    { name: "CO2 (ppm)", id: "69cf906291c0af00075e44e8" },
  ],
  92: [
    { name: "Luftverschmutzung (AQI)", id: "aqi_92" },
    { name: "Lärmverschmutzung (db)", id: "noise_92" },
    { name: "Elektrisches Feld (nT)", id: "efield_92" },
    { name: "Magnetisches Feld (nT)", id: "bfield_92" },
    { name: "CO2 (ppm)", id: "co2_92" },
  ],
};

function downloadData() {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const toDate = now.toISOString();
  const fromDate = oneMonthAgo.toISOString();

  const params = new URLSearchParams({
    boxId: BOX_IDS.join(","),
    "from-date": fromDate,
    "to-date": toDate,
  });

  const url = `https://api.opensensemap.org/boxes/data?${params}`;
  window.open(url, "_blank");
}

async function submit() {
  status.value = null;
  try {
    const res = await fetch(
      "https://pollution-sigma.vercel.app/api/measurement",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senseBoxId: senseBoxId.value,
          sensorId: sensorId.value,
          value: value.value,
        }),
      },
    );
    if (res.ok) {
      status.value = {
        ok: true,
        message: `✓ Messung gespeichert (SenseBox ${senseBoxId.value}, Sensor ${sensorId.value}): ${value.value}`,
      };
      value.value = null;
    } else {
      const text = await res.text();
      status.value = {
        ok: false,
        message: `Fehler ${res.status}: ${text}; tried to Post (SenseBox ${senseBoxId.value}, Sensor ${sensorId.value}): ${value.value}`,
      };
    }
  } catch (err) {
    status.value = { ok: false, message: `Netzwerkfehler: ${err.message}` };
  }
}
</script>
