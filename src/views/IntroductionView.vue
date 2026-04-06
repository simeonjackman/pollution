<script setup>
import prematureDeathsImage from "../assets/premature deaths.png";
</script>

<template>
  <section class="space-y-6">
    <article class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <h2 class="text-center text-lg font-semibold text-slate-900">Projekt</h2>
      <div class="mt-4 space-y-4 text-base leading-7 text-slate-700">
        <p>
          Dieses Projekt wurde für die Vorlesung BNE fördern am Gymnasium
          entwickelt. Es besteht aus drei Teilen:
        </p>
        <ul class="space-y-2 pl-5">
          <li>
            <span class="font-semibold text-slate-800"
              >Einführung/Theorie:</span
            >
            Grundlagen zur Umweltverschmutzung, wie man Sie messen kann und
            deren Auswirkungen
          </li>
          <li>
            <span class="font-semibold text-slate-800">Datenerfassen:</span>
            Praktische Messung von Umweltdaten vor Ort
          </li>
          <li>
            <span class="font-semibold text-slate-800"
              >Datenanalyse und Diskussion:</span
            >
            Auswertung und Interpretation der gesammelten Daten
          </li>
        </ul>
        <p>
          Diese drei Teile werden durch eine Mischung von Arbeitsblättern, einem
          Spaziergang und dieser Webseite durchgeführt.
        </p>
      </div>
    </article>

    <article class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <h2 class="text-center text-lg font-semibold text-slate-900">
        Verschmutzung
      </h2>
      <p class="mt-4 text-base leading-7 text-slate-700">
        Umweltverschmutzung verursacht ca. 10% der vorzeitigen Todesfälle in der
        EU (Stand 2025). Basierend auf den Daten der umliegenden Länder (siehe
        Abbildung) und historischen Daten kann davon ausgegangen werden, dass
        diese Zahl für die Schweiz ungefähr stimmt.
      </p>
      <figure class="mt-4 space-y-2">
        <div
          class="overflow-hidden rounded-lg border border-slate-200 bg-white"
        >
          <img
            :src="prematureDeathsImage"
            alt="Karte mit vorzeitigen Todesfällen durch Umweltverschmutzung in Europa"
            class="h-auto w-full"
            loading="lazy"
          />
        </div>
        <figcaption class="text-xs leading-5 text-slate-500">
          Abbildung: Vorzeitige Todesfälle in % durch Umweltverschmutzung in
          Europa.
        </figcaption>
      </figure>
      <p class="mt-4 text-sm leading-6 text-slate-600">
        Quelle:
        <a
          href="https://www.eea.europa.eu/en/european-zero-pollution-dashboards/indicators/premature-deaths-as-a-result-of-environmental-pollution"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:no-underline"
        >
          European Environment Agency
        </a>
        | Abbildung:
        <a
          href="https://tableau-public.discomap.eea.europa.eu/views/FIG-281935-Premature-death/Infographic?:device=desktop"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:no-underline"
        >
          Tableau Public
        </a>
      </p>
    </article>
  </section>
</template>
