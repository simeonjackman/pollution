<template>
  <div class="space-y-4 text-black">
    <h3 class="text-xl font-semibold text-center">Datenerfassung</h3>

    <button
      @click="showMap = !showMap"
      class="h-12 w-full cursor-pointer rounded-xl bg-slate-700 text-base text-white"
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
          @click="
            senseBoxId = '69cf8fb591c0af00075d3ce8';
            sensorId = '';
          "
          :class="[
            'h-12 cursor-pointer rounded-2xl border-2 px-4 text-base font-semibold',
            senseBoxId === '69cf8fb591c0af00075d3ce8'
              ? 'bg-slate-600 text-white border-slate-600'
              : 'bg-slate-100 text-slate-800 border-slate-300',
          ]"
        >
          🌲 Wald
        </button>
        <button
          type="button"
          @click="
            senseBoxId = '69cf906291c0af00075e44e3';
            sensorId = '';
          "
          :class="[
            'h-12 cursor-pointer rounded-2xl border-2 px-4 text-base font-semibold',
            senseBoxId === '69cf906291c0af00075e44e3'
              ? 'bg-slate-600 text-white border-slate-600'
              : 'bg-slate-100 text-slate-800 border-slate-300',
          ]"
        >
          🚗 Strasse
        </button>
        <button
          type="button"
          @click="
            senseBoxId = '69cf9aa991c0af00076e356c';
            sensorId = '';
          "
          :class="[
            'h-12 cursor-pointer rounded-2xl border-2 px-4 text-base font-semibold',
            senseBoxId === '69cf9aa991c0af00076e356c'
              ? 'bg-slate-600 text-white border-slate-600'
              : 'bg-slate-100 text-slate-800 border-slate-300',
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

    <div
      v-if="senseBoxId && sensorId && value !== null"
      class="rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-center text-sm font-semibold text-red-800"
    >
      <b>Warnung:</b> Es kann bis zu 10 Sekunden dauern, bis ein Messwert
      erfasst wird!
    </div>

    <button
      v-if="senseBoxId && sensorId && value !== null"
      @click="submit"
      class="h-12 w-full cursor-pointer rounded-xl bg-emerald-700 text-base text-white"
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const senseBoxId = ref("");
const sensorId = ref("");
const value = ref(null);
const status = ref(null);

const showMap = ref(false);

const SENSOR_MAP = {
  "69cf8fb591c0af00075d3ce8": [
    {
      name: "Luftverschmutzung PM 2.5 (Mikrogramm pro Kubikmeter)",
      id: "69cf8fb591c0af00075d3ce9",
    },
    { name: "Lärmverschmutzung (db)", id: "69cf8fb591c0af00075d3cea" },
    {
      name: "Elektrisches Feld 5-100 Hz (Volt pro Meter)",
      id: "69cf8fb591c0af00075d3ceb",
    },
    { name: "Magnetisches Feld 5-100 Hz (nT)", id: "69cf8fb591c0af00075d3cec" },
    { name: "CO2 (ppm)", id: "69cf8fb591c0af00075d3ced" },
  ],
  "69cf906291c0af00075e44e3": [
    {
      name: "Luftverschmutzung PM 2.5 (Mikrogramm pro Kubikmeter)",
      id: "69cf906291c0af00075e44e4",
    },
    { name: "Lärmverschmutzung (db)", id: "69cf906291c0af00075e44e5" },
    {
      name: "Elektrisches Feld 5-100 Hz (Volt pro Meter)",
      id: "69cf906291c0af00075e44e6",
    },
    {
      name: "Magnetisches Feld 5-100 Hz (nT) ",
      id: "69cf906291c0af00075e44e7",
    },
    { name: "CO2 (ppm)", id: "69cf906291c0af00075e44e8" },
  ],
  "69cf9aa991c0af00076e356c": [
    {
      name: "Luftverschmutzung PM 2.5 (Mikrogramm pro Kubikmeter)",
      id: "69cf9aa991c0af00076e356d",
    },
    { name: "Lärmverschmutzung (db)", id: "69cf9aa991c0af00076e356e" },
    {
      name: "Elektrisches Feld 5-100 Hz (Volt pro Meter)",
      id: "69cf9aa991c0af00076e356f",
    },
    { name: "Magnetisches Feld 5-100 Hz (nT)", id: "69cf9aa991c0af00076e3570" },
    { name: "CO2 (ppm)", id: "69cf9aa991c0af00076e3571" },
  ],
};

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
