<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 space-y-4">
      <h2 class="text-xl font-semibold text-center">BNE Projekt FHNW:</h2>
      <h3 class="text-xl font-semibold text-center">Messwerte erfassen</h3>
      

      <!-- Location -->
      <div>
        <label class="block text-lg font-medium mb-2">Wo wird gemessen?</label>
        <div class="grid grid-cols-1 gap-4">
          <button
            type="button"
            @click="senseBoxId = '10'"
            :class="['p-4 rounded-2xl border-2 text-lg font-semibold', senseBoxId==='10' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-white border-gray-300']"
          >Wald</button>
          <button
            type="button"
            @click="senseBoxId = '25'"
            :class="['p-4 rounded-2xl border-2 text-lg font-semibold', senseBoxId==='25' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-white border-gray-300']"
          >Strasse</button>
          <button
            type="button"
            @click="senseBoxId = '92'"
            :class="['p-4 rounded-2xl border-2 text-lg font-semibold', senseBoxId==='92' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-white border-gray-300']"
          >Siedlungsgebiet</button>
        </div>
      </div>

      <!-- Measurement type -->
      <div v-if="senseBoxId">
        <label class="block text-lg font-medium mb-2">Was wird gemessen?</label>
        <select v-model="sensorId" class="w-full border rounded-xl p-3 text-base">
          <option disabled value="">Wähle...</option>
          <option value="3466446">Temperatur</option>
          <option value="2356444">CO2</option>
          <option value="4234433">Feuchtigkeit</option>
        </select>
      </div>

      <!-- Value -->
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

      <!-- Button -->
      <button
        :disabled="!senseBoxId || !sensorId || value === null"
        @click="submit"
        class="w-full bg-green-600 text-white rounded-xl p-3 text-base disabled:opacity-40"
      >
        Messung einreichen
      </button>

      <!-- Result -->
      <div v-if="status" :class="['rounded-xl p-3 text-sm', status.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800']">
        {{ status.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const senseBoxId = ref('')
const sensorId = ref('')
const value = ref(null)
const status = ref(null)

async function submit() {
  status.value = null
  try {
    const res = await fetch('https://pollution-sigma.vercel.app/api/measurement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senseBoxId: senseBoxId.value,
        sensorId: sensorId.value,
        value: value.value,
      }),
    })
    if (res.ok) {
      status.value = { ok: true, message: `✓ Messung gespeichert (SenseBox ${senseBoxId.value}, Sensor ${sensorId.value}): ${value.value}` }
      value.value = null
    } else {
      const text = await res.text()
      status.value = { ok: false, message: `Fehler ${res.status}: ${text}` }
    }
  } catch (err) {
    status.value = { ok: false, message: `Netzwerkfehler: ${err.message}` }
  }
}
</script>
