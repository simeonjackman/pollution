<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 space-y-4">
      <h2 class="text-xl font-semibold text-center">BNE Projekt FHNW: Messwerte erfassen</h2>

      <!-- Location -->
      <div>
        <label class="block text-lg font-medium mb-2">Wo wird gemessen?</label>
        <div class="grid grid-cols-1 gap-4">
          <button
            type="button"
            @click="location = 'Wald'"
            :class="['p-4 rounded-2xl border-2 text-lg font-semibold', location==='Wald' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-white border-gray-300']"
          >Wald</button>
          <button
            type="button"
            @click="location = 'Strasse'"
            :class="['p-4 rounded-2xl border-2 text-lg font-semibold', location==='Strasse' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-white border-gray-300']"
          >Strasse</button>
          <button
            type="button"
            @click="location = 'Siedlungsgebiet'"
            :class="['p-4 rounded-2xl border-2 text-lg font-semibold', location==='Siedlungsgebiet' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-white border-gray-300']"
          >Siedlungsgebiet</button>
        </div>
      </div>

      <!-- Measurement type -->
      <div v-if="location">
        <label class="block text-sm font-medium mb-1">Messung</label>
        <select v-model="type" class="w-full border rounded-xl p-3 text-base">
          <option disabled value="">Wähle...</option>
          <option value="temperature">Temperatur</option>
          <option value="CO2">CO2</option>
          <option value="humidity">Feuchtigkeit</option>
        </select>
      </div>

      <!-- Value -->
      <div v-if="type">
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
        :disabled="!location || !type || value === null"
        @click="submit"
        class="w-full bg-green-600 text-white rounded-xl p-3 text-base disabled:opacity-40"
      >
        Messung einreichen
      </button>

      <!-- Result -->
      <div v-if="submitted" class="bg-gray-50 rounded-xl p-3 text-sm">
        <div><b>Location:</b> {{ location }}</div>
        <div><b>Type:</b> {{ type }}</div>
        <div><b>Value:</b> {{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const location = ref('')
const type = ref('')
const value = ref(null)
const submitted = ref(false)

function submit() {
  submitted.value = true
}
</script>
