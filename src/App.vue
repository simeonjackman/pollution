<script setup>
import { ref } from "vue";

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header
      class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur"
    >
      <div
        class="relative mx-auto flex h-14 w-full max-w-lg items-center justify-center px-4 sm:px-6 lg:max-w-3xl"
      >
        <h1
          class="text-center text-sm font-semibold tracking-wide text-slate-800 sm:text-base"
        >
          BNE: Verschmutzung sichtbar machen
        </h1>

        <button
          type="button"
          class="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-slate-500 bg-slate-700 text-white"
          aria-label="Menü öffnen"
          @click="menuOpen = !menuOpen"
        >
          <span class="space-y-1">
            <span class="block h-0.5 w-5 bg-white"></span>
            <span class="block h-0.5 w-5 bg-white"></span>
            <span class="block h-0.5 w-5 bg-white"></span>
          </span>
        </button>
      </div>
    </header>

    <div
      v-if="menuOpen"
      class="fixed inset-x-0 top-16 z-50 px-2 sm:px-3 pointer-events-none"
    >
      <div class="mx-auto w-full max-w-lg lg:max-w-3xl">
        <nav
          class="ml-auto w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg pointer-events-auto"
        >
          <div class="grid grid-cols-1 gap-2">
            <RouterLink
              to="/introduction"
              class="flex h-12 items-center justify-center rounded-lg bg-slate-700 px-3 text-center text-base font-semibold !text-white"
              active-class="!bg-slate-600 !text-white"
              @click="closeMenu"
            >
              Einführung
            </RouterLink>
            <RouterLink
              to="/measurement"
              class="flex h-12 items-center justify-center rounded-lg bg-slate-700 px-3 text-center text-base font-semibold !text-white"
              active-class="!bg-slate-600 !text-white"
              @click="closeMenu"
            >
              Messung
            </RouterLink>
            <RouterLink
              to="/data-uploader"
              class="flex h-12 items-center justify-center rounded-lg bg-slate-700 px-3 text-center text-base font-semibold !text-white"
              active-class="!bg-slate-600 !text-white"
              @click="closeMenu"
            >
              Datenerfassung
            </RouterLink>
            <RouterLink
              to="/data-analysis"
              class="flex h-12 items-center justify-center rounded-lg bg-slate-700 px-3 text-center text-base font-semibold !text-white"
              active-class="!bg-slate-600 !text-white"
              @click="closeMenu"
            >
              Datenanalyse
            </RouterLink>
          </div>
        </nav>
      </div>
    </div>

    <main class="px-2 pb-4 pt-4 sm:px-3">
      <div
        class="mx-auto w-full max-w-lg rounded-2xl bg-white p-5 text-black shadow-lg lg:max-w-3xl"
      >
        <RouterView />
      </div>
    </main>

    <footer class="px-4 pb-4 text-center text-xs text-gray-500">
      Projekt von Iryna Roth, Nina Brunner und Simeon Jackman zum Kurs WBWA110
      Bildung für Nachhaltige Entwicklung fördern am Gymnasium
    </footer>

    <button
      v-if="menuOpen"
      type="button"
      class="fixed inset-0 z-40 cursor-pointer bg-transparent"
      aria-label="Menü schließen"
      @click="closeMenu"
    ></button>
  </div>
</template>
