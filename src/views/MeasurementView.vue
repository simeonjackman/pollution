<script setup>
import { ref } from "vue";

const selectedChapter = ref("co2");

function selectChapter(chapterId) {
  selectedChapter.value = chapterId;
}
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-center text-xl font-semibold text-slate-900">Messung</h1>

    <nav class="rounded-xl border border-slate-200 bg-white p-2">
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          class="rounded-lg border px-3 py-2 text-left text-sm font-semibold transition"
          :class="
            selectedChapter === 'co2'
              ? 'border-slate-700 bg-slate-700 text-white'
              : 'border-slate-300 bg-white text-slate-800'
          "
          @click="selectChapter('co2')"
        >
          CO₂
        </button>
        <button
          type="button"
          class="rounded-lg border px-3 py-2 text-left text-sm font-semibold transition"
          :class="
            selectedChapter === 'pm'
              ? 'border-slate-700 bg-slate-700 text-white'
              : 'border-slate-300 bg-white text-slate-800'
          "
          @click="selectChapter('pm')"
        >
          Feinstaub
        </button>
        <button
          type="button"
          class="rounded-lg border px-3 py-2 text-left text-sm font-semibold transition"
          :class="
            selectedChapter === 'emf'
              ? 'border-slate-700 bg-slate-700 text-white'
              : 'border-slate-300 bg-white text-slate-800'
          "
          @click="selectChapter('emf')"
        >
          Elektrosmog
        </button>
        <button
          type="button"
          class="rounded-lg border px-3 py-2 text-left text-sm font-semibold transition"
          :class="
            selectedChapter === 'noise'
              ? 'border-slate-700 bg-slate-700 text-white'
              : 'border-slate-300 bg-white text-slate-800'
          "
          @click="selectChapter('noise')"
        >
          Lärm
        </button>
        <button
          type="button"
          class="rounded-lg border px-3 py-2 text-left text-sm font-semibold transition sm:col-span-2"
          :class="
            selectedChapter === 'overview'
              ? 'border-slate-700 bg-slate-700 text-white'
              : 'border-slate-300 bg-white text-slate-800'
          "
          @click="selectChapter('overview')"
        >
          Übersicht
        </button>
      </div>
    </nav>

    <article
      v-if="selectedChapter === 'co2'"
      class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
    >
      <h2 class="text-center text-lg font-semibold text-slate-900">
        CO<sub>2</sub>
      </h2>

      <div class="mt-4 space-y-4 text-base leading-7 text-slate-700">
        <div>
          <h3 class="font-semibold text-slate-800">Was wird gemessen?</h3>
          <p>
            CO₂ kommt natürlich in der Luft vor, entsteht aber auch durch
            Verbrennung fossiler Brennstoffe, Verkehr, Heizungen und Kraftwerke
            etc. Ist das wichtigste anthropogene Treibhausgas, globaler Wert
            aktuell bei 422ppm. In Innenräumen kann es sich durch menschliche
            Atemluft stark anreichern und die Konzentration und
            Leistungsfähigkeit beeinträchtigen.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-slate-800">
            Wie funktioniert der Sensor?
          </h3>
          <div class="mt-2 divide-y divide-slate-200">
            <div class="py-3">
              <p class="font-semibold text-slate-900">
                Aktuelles Gerät: MOX-Sensor (Metal Oxide Sensor)
              </p>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                <li>
                  Ein Metalloxid (z. B. Zinnoxid SnO₂) wird auf 200-400 C
                  erhitzt.
                </li>
                <li>
                  Gasmoleküle reagieren chemisch mit der erhitzten Oberfläche.
                </li>
                <li>
                  Diese Reaktion verändert den elektrischen Widerstand des
                  Materials.
                </li>
                <li>
                  Der gemessene Widerstand wird in eine Gaskonzentration
                  umgerechnet.
                </li>
              </ul>
            </div>

            <div class="py-3 text-slate-700">
              <p class="font-semibold text-slate-900">
                Wichtiger Hinweis zur Gültigkeit
              </p>
              <p class="mt-1">
                MOX-Sensoren messen kein reines CO₂, sondern ein Gemisch
                verschiedener Gase. Der angezeigte Wert ist daher eine
                Schätzgroesse und beeinflusst die Validity unserer Messung.
              </p>
            </div>

            <div class="py-3">
              <p class="font-semibold text-slate-900">
                Hochwertige Alternative: NDIR (Non-Dispersive Infrared)
              </p>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                <li>Infrarotstrahlung wird durch eine Luftprobe geleitet.</li>
                <li>
                  CO₂ absorbiert IR-Licht bei einer charakteristischen
                  Wellenlänge (~4,26 um).
                </li>
                <li>
                  Je mehr CO₂ vorhanden ist, desto weniger Licht kommt am
                  Detektor an.
                </li>
                <li>
                  Grundlage ist das Lambert-Beer-Gesetz:<br />
                  I = I₀ · e^(-e · c · d).
                </li>
              </ul>
              <p class="mt-2 font-medium text-slate-900">
                Vorteil: NDIR misst CO₂ direkt und deutlich spezifischer.
              </p>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">Grenzwerte CO₂</h3>
          <div
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table
              class="w-full min-w-[640px] border-collapse text-left text-sm leading-6"
            >
              <thead class="bg-slate-100 text-slate-900">
                <tr>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Konzentration
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Bewertung
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Auswirkung
                  </th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    &lt; 800 ppm
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">Gute Luft</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Unbedenklich
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    800-1000 ppm
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Mässige Luft
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Lüften empfehlenswert
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    1000-2000 ppm
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Schlechte Luft
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Konzentration sinkt, Kopfschmerzen möglich
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    &gt; 2000 ppm
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Sehr schlechte Luft
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Sofort lüften - gesundheitsgefährdend
                  </td>
                </tr>
                <tr>
                  <td class="px-3 py-2">Aussenluft: ~422 ppm</td>
                  <td class="px-3 py-2">Referenzwert 2024</td>
                  <td class="px-3 py-2">Globaler Durchschnitt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>

    <article
      v-if="selectedChapter === 'pm'"
      class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
    >
      <h2 class="text-center text-lg font-semibold text-slate-900">
        Feinstaub - PM2.5 und PM10
      </h2>

      <div class="mt-4 space-y-4 text-base leading-7 text-slate-700">
        <div>
          <h3 class="font-semibold text-slate-800">Was wird gemessen?</h3>
          <p>
            Feinstaub bezeichnet mikroskopisch kleine Partikel, die in der Luft
            schweben. Sie werden nach ihrer Grösse klassifiziert:
          </p>
          <ul class="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span class="font-semibold text-slate-900">PM10:</span>
              Partikel mit Durchmesser &lt; 10 Mikrometer (µm). Aufgewirbelter
              Strassenstaub, Baustellen, Pollen sowie Abrieb von Reifen und
              Bremsen. Einatembar: Werden in Nase und Rachen gefiltert, können
              aber Husten und Schleimhautreizungen auslösen.
            </li>
            <li>
              <span class="font-semibold text-slate-900">PM2.5:</span>
              Partikel mit Durchmesser &lt; 2,5 µm. Vorkommen bei
              Verbrennungsprozessen wie Heizungen, Motoren, Kaminen,
              Industrieabgasen und Tabakrauch. Lüngengängig: Können tief in die
              Lunge eindringen, bis in Bronchien und Lungenbläschen. Erhöht das
              Risiko für Asthma und Herz-Kreislauf-Erkrankungen.
            </li>
            <li>
              <span class="font-semibold text-slate-900">PM1:</span>
              Partikel &lt; 1 µm. Russpartikel, Autoabgase, Viren,
              Zigarettenrauch und Küchendämpfe beim Braten. Ultrafein: Können
              die Blut-Luft-Schranke passieren und Schadstoffe direkt in
              Blutbahn und Organe transportieren. PM1 ist technisch schwerer
              präzise zu messen, wird aber zunehmend wichtiger, da diese
              winzigen Partikel die höchste biologische Aktivität im Körper
              zeigen.
            </li>
          </ul>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">Messeinheit</h3>
          <p class="mt-1">
            Feinstaub wird in µg/m³ (Mikrogramm pro Kubikmeter Luft) gemessen.
          </p>
          <p class="mt-3 font-semibold text-slate-800">
            Grenzwerte Feinstaub (WHO-Richtlinien 2021)
          </p>

          <div
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table
              class="w-full min-w-[640px] border-collapse text-left text-sm leading-6"
            >
              <thead class="bg-slate-100 text-slate-900">
                <tr>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Parameter
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Jahresmittelwert
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    24h-Mittelwert
                  </th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">PM2.5</td>
                  <td class="border-b border-slate-200 px-3 py-2">5 µg/m³</td>
                  <td class="border-b border-slate-200 px-3 py-2">15 µg/m³</td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">PM10</td>
                  <td class="border-b border-slate-200 px-3 py-2">15 µg/m³</td>
                  <td class="border-b border-slate-200 px-3 py-2">45 µg/m³</td>
                </tr>
                <tr>
                  <td class="px-3 py-2">EU-Grenzwert PM2.5 (2024)</td>
                  <td class="px-3 py-2">10 µg/m³</td>
                  <td class="px-3 py-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-slate-800">
            Wie funktioniert der Sensor?
          </h3>
          <div class="mt-2 divide-y divide-slate-200">
            <div class="py-3">
              <p class="font-semibold text-slate-900">
                Bosean-Sensor: Laserstreuung (Optical Particle Counter)
              </p>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                <li>Ein Laserstrahl trifft auf die angesaugte Luft.</li>
                <li>
                  Partikel in der Luft streuen das Licht in verschiedene
                  Richtungen.
                </li>
                <li>
                  Ein Photodetektor misst die Intensität des gestreuten Lichts.
                </li>
                <li>
                  Aus der Streuintensität wird auf Anzahl und Grösse der
                  Partikel geschlossen.
                </li>
              </ul>
            </div>

            <div class="py-3 text-slate-700">
              <p class="font-semibold text-slate-900">
                Physikalischer Hintergrund: Mie-Streuung
              </p>
              <p class="mt-1">
                Wenn Partikel ähnlich gross wie die Wellenlänge des Lichts sind,
                tritt Mie-Streuung auf. Die Winkelverteilung des gestreuten
                Lichts hängt von Partikelgrösse und Form ab. So kann der Sensor
                zwischen PM1, PM2.5 und PM10 unterscheiden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>

    <article
      v-if="selectedChapter === 'emf'"
      class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
    >
      <h2 class="text-center text-lg font-semibold text-slate-900">
        Elektrische und magnetische Felder (Elektrosmog)
      </h2>

      <div class="mt-4 space-y-4 text-base leading-7 text-slate-700">
        <div>
          <h3 class="font-semibold text-slate-800">Was wird gemessen?</h3>
          <p>
            Das Gerät Gigahertz Solutions ME 3851A misst zwei Feldtypen im
            Niederfrequenzbereich (5 Hz - 100 kHz):
          </p>

          <div class="mt-2 divide-y divide-slate-200">
            <div class="py-3">
              <p class="font-semibold text-slate-900">
                Elektrisches Feld (E-Feld)
              </p>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                <li>
                  Entsteht durch elektrische Spannungen (z. B. in
                  Stromleitungen, auch wenn kein Strom fliesst).
                </li>
                <li>Gemessen in V/m (Volt pro Meter).</li>
                <li>
                  Die Antenne des Geräts wirkt als Dipol: Ein äusseres E-Feld
                  induziert eine messbare Spannung.
                </li>
              </ul>
            </div>

            <div class="py-3">
              <p class="font-semibold text-slate-900">
                Magnetisches Feld (M-Feld)
              </p>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                <li>Entsteht durch fliessende elektrische Ströme.</li>
                <li>Gemessen in nT (Nanotesla) oder alternativ in µT.</li>
                <li>
                  Messprinzip: Faradaysches Induktionsgesetz. Je schneller sich
                  das Magnetfeld ändert und je stärker es ist, desto grösser ist
                  die im Sensor induzierte Spannung.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">Warum zwei Felder?</h3>
          <p>
            Nach den Maxwell-Gleichungen sind elektrische und magnetische Felder
            fundamental miteinander verknüpft. Bei niedrigen Frequenzen (&lt;
            100 kHz) können sie jedoch noch getrennt gemessen werden. Bei
            Hochfrequenz (WLAN, 5G) treten sie als gemeinsame elektromagnetische
            Welle auf. Dann braucht man andere Messgeräte.
          </p>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">
            Die vier Messbereiche des Geräts
          </h3>
          <p>
            Vier wählbare Frequenzbereiche sind jeweils auf bestimmte Quellen im
            Alltag zugeschnitten:
          </p>
          <ul class="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span class="font-semibold text-slate-900"
                >5 Hz - 100 kHz (Vollbereich):</span
              >
              Der gesamte Messbereich des Geräts. Erfasst alle
              Niederfrequenzquellen gleichzeitig und eignet sich als erster
              Überblick.
            </li>
            <li>
              <span class="font-semibold text-slate-900"
                >16 Hz (Bahnstrom):</span
              >
              Europäische Bahnnetze betreiben ihre Oberleitungen mit 16⅔ Hz
              Wechselstrom. In Bahnnähe sind erhöhte Feldwerte bei genau dieser
              Frequenz messbar. Der spezifische Bereich erlaubt es, diesen
              Bahnstrom-Anteil isoliert zu betrachten.
            </li>
            <li>
              <span class="font-semibold text-slate-900"
                >50 Hz - 100 kHz (Stromnetz):</span
              >
              50 Hz ist die Netzfrequenz des CH-Stromnetzes. Steckdosen, Kabel,
              Transformatoren und Haushaltsgeräte emittieren bei dieser
              Frequenz. Das ist der wichtigste Bereich für Innenraummessungen.
            </li>
            <li>
              <span class="font-semibold text-slate-900"
                >2 kHz - 100 kHz (Schaltnetzteile):</span
              >
              Moderne Elektronik wie Laptops, LED-Treiber, Induktionskochfelder
              und Energiesparlampen erzeugt Oberwellen im kHz-Bereich, oft als
              Vielfache der 50-Hz-Grundfrequenz. Dieser Bereich blendet das
              starke 50-Hz-Signal aus und macht schwache kHz-Quellen sichtbar.
            </li>
          </ul>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">
            Was deckt das Gerät NICHT ab?
          </h3>
          <p>
            Das Gerät ist auf Niederfrequenz (NF) spezialisiert. Viele
            allgegenwärtige Hochfrequenzquellen werden nicht erfasst:
          </p>

          <div
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table
              class="w-full min-w-[780px] border-collapse text-left text-sm leading-6"
            >
              <thead class="bg-slate-100 text-slate-900">
                <tr>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Bereich
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Frequenz
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Quellen
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Abgedeckt?
                  </th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Statische Felder (DC)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">0 Hz</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    MRT, Permanentmagnete
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">Nein</td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">Bahn</td>
                  <td class="border-b border-slate-200 px-3 py-2">16 Hz</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Zugstromversorgung
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">Ja</td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">Stromnetz</td>
                  <td class="border-b border-slate-200 px-3 py-2">50 Hz</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Haushaltsgeräte, Leitungen
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">Ja</td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Schaltnetzteile / LED
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    2 kHz - 100 kHz
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Laptops, Induktionskochfeld
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">Ja</td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    UKW / DAB Radio
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    87 MHz - 240 MHz
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Rundfunksender
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">Nein</td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    WLAN / Bluetooth
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    2,4 GHz / 5 GHz
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Router, Smartphones
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">Nein</td>
                </tr>
                <tr>
                  <td class="px-3 py-2">5G Mobilfunk</td>
                  <td class="px-3 py-2">3,5 GHz - 28 GHz</td>
                  <td class="px-3 py-2">Mobilfunkmasten, Smartphones</td>
                  <td class="px-3 py-2">Nein</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mt-3">
            Für unser Projekt messen wir nur Niederfrequenzquellen im Alltag
            (Steckdosen, Kabel, Geräte, Züge). Für WLAN, Mobilfunk oder
            Bluetooth wäre ein separates Hochfrequenz-Messgerät nötig.
          </p>
          <p class="mt-2">
            Wichtiges Validity-Argument: Das Gerät misst zuverlässig, aber nur
            einen Teil des elektromagnetischen Spektrums, das uns im Alltag
            umgibt.
          </p>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">
            Grenzwerte elektromagnetische Felder (ICNIRP / EU-Richtlinie)
          </h3>

          <div
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table
              class="w-full min-w-[740px] border-collapse text-left text-sm leading-6"
            >
              <thead class="bg-slate-100 text-slate-900">
                <tr>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Parameter
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Grenzwert
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Typische Werte
                  </th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    E-Feld (50 Hz)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    5 kV/m (Allgemeinbevölkerung)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    ~0,1-10 V/m in Wohnräumen
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    M-Feld (50 Hz)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    200 µT (Allgemeinbevölkerung)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    &lt; 0,4 µT in Wohnräumen
                  </td>
                </tr>
                <tr>
                  <td class="px-3 py-2">Schweizer Grenzwert (Vorsorge)</td>
                  <td class="px-3 py-2">1 kV/m / 1 µT</td>
                  <td class="px-3 py-2">Strengerer Vorsorgewert</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">Messeinheiten</h3>
          <div
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table
              class="w-full min-w-[760px] border-collapse text-left text-sm leading-6"
            >
              <thead class="bg-slate-100 text-slate-900">
                <tr>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Grösse
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Einheit
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Bedeutung
                  </th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Elektrisches Feld
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    V/m (Volt pro Meter)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Spannung pro Längeneinheit; beschreibt die Stärke des
                    elektrischen Feldes an einem Punkt.
                  </td>
                </tr>
                <tr>
                  <td class="px-3 py-2">Magnetisches Feld</td>
                  <td class="px-3 py-2">nT oder µT (1 µT = 1000 nT)</td>
                  <td class="px-3 py-2">
                    Magnetische Flussdichte; beschreibt, wie stark ein
                    Magnetfeld durch einen bestimmten Bereich tritt. Das ME
                    3851A misst in nT.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">
            Relevanz - Warum sind elektromagnetische Felder ein Thema?
          </h3>
          <p>
            Niederfrequente elektromagnetische Felder sind ein normaler
            Bestandteil unserer Umwelt. Sie entstehen überall dort, wo
            elektrischer Strom fliesst oder Spannung anliegt. Wichtige Quellen
            im Alltag sind:
          </p>
          <ul class="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span class="font-semibold text-slate-900"
                >Stromnetz (50 Hz):</span
              >
              Haushaltsgeräte, Kabel und Steckdosen erzeugen E- und M-Felder,
              besonders stark in der Nähe von Transformatoren,
              Hochspannungsleitungen oder Verteilerkästen.
            </li>
            <li>
              <span class="font-semibold text-slate-900"
                >Bahnstrom (16 Hz):</span
              >
              Hochspannungsleitungen entlang von Bahnstrecken können erhebliche
              Felder erzeugen, wie in der Messung im Wald sichtbar.
            </li>
            <li>
              <span class="font-semibold text-slate-900"
                >Moderne Elektronik (2 kHz-100 kHz):</span
              >
              Laptops, LED-Beleuchtung, Induktionskochfelder und Schaltnetzteile
              senden Oberwellen aus.
            </li>
          </ul>
          <p class="mt-3">
            Die gesundheitliche Bewertung von NF-Feldern unterhalb der
            Grenzwerte ist wissenschaftlich umstritten. Einige Studien deuten
            auf mögliche Langzeitwirkungen bei dauerhafter Exposition hin, z. B.
            Schlafstörungen oder bei Kindern diskutierte Leukämierisiken bei
            starken M-Feldern. Die WHO stuft NF-Magnetfelder als "möglicherweise
            karzinogen" (Gruppe 2B) ein. Diese Einstufung bedeutet jedoch nicht,
            dass ein Risiko bewiesen ist.
          </p>
          <p class="mt-2">
            Für unser Projekt wichtig: Wir messen nur Niederfrequenzfelder (&lt;
            100 kHz). Hochfrequenzquellen wie WLAN, Bluetooth oder 5G sind mit
            diesem Gerät nicht messbar. Die gemessenen Felder stammen primär aus
            dem Stromnetz und im Wald aus der Hochspannungsleitung.
          </p>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">Grenzwerte im Detail</h3>
          <div
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table
              class="w-full min-w-[780px] border-collapse text-left text-sm leading-6"
            >
              <thead class="bg-slate-100 text-slate-900">
                <tr>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Norm / Quelle
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    E-Feld (50 Hz)
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    M-Feld (50 Hz)
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Gilt für
                  </th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Schweizer NISV (Vorsorgewert Hochspannungsleitungen)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">1.000 V/m</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    1.000 nT (= 1 µT)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Orte mit dauerhaftem Aufenthalt (z. B. Schlafzimmer,
                    Schulen)
                  </td>
                </tr>
                <tr>
                  <td class="px-3 py-2">Typische Messwerte (Vergleich)</td>
                  <td class="px-3 py-2">
                    Wohnraum: 1-10 V/m<br />
                    Messung Wald: ~390 V/m
                  </td>
                  <td class="px-3 py-2">
                    Wohnraum: &lt; 400 nT<br />
                    Messung Wald: ~100 nT
                  </td>
                  <td class="px-3 py-2">Alle Standorte</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mt-3">
            Strasse, Hütte und Siedlung: E-Felder von 1-2 V/m und M-Felder von
            35-56 nT liegen weit unterhalb aller Grenzwerte und sind typisch für
            normale Aussenumgebungen.
          </p>
          <p class="mt-2">
            Wald (Hochspannungsleitung): E-Feld ~390 V/m liegt unterhalb des
            ICNIRP-Grenzwerts (5.000 V/m), aber über dem strengen Schweizer
            Vorsorgewert (1.000 V/m). Ein eindrückliches Beispiel dafür, wie
            Infrastruktur die Umwelt verändern kann.
          </p>
        </div>
      </div>
    </article>

    <article
      v-if="selectedChapter === 'noise'"
      class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
    >
      <h2 class="text-center text-lg font-semibold text-slate-900">
        4. Lärm - Schalldruckpegel
      </h2>

      <div class="mt-4 space-y-4 text-base leading-7 text-slate-700">
        <div>
          <h3 class="font-semibold text-slate-800">Was wird gemessen?</h3>
          <p>
            Lärm ist unerwünschter Schall. Schall sind Druckschwankungen in der
            Luft, die sich als Welle ausbreiten. Die App Decibel Pro misst den
            Schalldruckpegel über das Mikrofon des Smartphones.
          </p>
          <p class="mt-2">
            Die Dezibel-Skala ist logarithmisch:
            <span class="font-semibold text-slate-900"
              >L = 20 * log<sub>10</sub>(p / p<sub>0</sub>)</span
            >
            mit
            <span class="font-semibold text-slate-900"
              >p<sub>0</sub> = 2 * 10<sup>-5</sup> Pa</span
            >
            (menschliche Hörschwelle).
          </p>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">Was bedeutet das?</h3>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>+10 dB = 10x mehr Schalldruck</li>
            <li>+20 dB = 100x mehr Schalldruck</li>
            <li>
              80 dB ist nicht doppelt so laut wie 40 dB, sondern rund 100-mal
              lauter.
            </li>
          </ul>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">
            Wie funktioniert die Messung?
          </h3>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>
              Das Mikrofon wandelt Luftdruckschwankungen in elektrische Signale
              um.
            </li>
            <li>Das Signal wird verstärkt und digitalisiert.</li>
            <li>
              Die App berechnet daraus den Schalldruckpegel in Dezibel (dB).
            </li>
          </ul>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">App: Decibel Pro</h3>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>
              App Store: "Decibel Pro" herunterladen (alternativ Phyphox).
            </li>
            <li>
              Smartphone auf ruhige, flache Fläche legen oder ruhig halten.
            </li>
            <li>
              Mindestens 30 Sekunden (eigene Messwerte: 2 min) messen und den
              Durchschnittswert notieren.
            </li>
            <li>Nicht sprechen während der Messung.</li>
          </ul>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <h3 class="font-semibold text-slate-800">Grenzwerte Lärm</h3>
          <div
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table
              class="w-full min-w-[700px] border-collapse text-left text-sm leading-6"
            >
              <thead class="bg-slate-100 text-slate-900">
                <tr>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Pegel
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Bewertung
                  </th>
                  <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                    Beispiel
                  </th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    &lt; 30 dB
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Sehr ruhig
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Schlafzimmer nachts
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">30-40 dB</td>
                  <td class="border-b border-slate-200 px-3 py-2">Ruhig</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Bibliothek
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">40-55 dB</td>
                  <td class="border-b border-slate-200 px-3 py-2">Mässig</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Büro, Gespräch
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">55-65 dB</td>
                  <td class="border-b border-slate-200 px-3 py-2">Belastend</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Belebte Strasse
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">65-85 dB</td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Schädlich (langfristig)
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Stadtverkehr, Fabrik
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-slate-200 px-3 py-2">
                    &gt; 85 dB
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Gehörschädigend
                  </td>
                  <td class="border-b border-slate-200 px-3 py-2">
                    Konzert, Baustellenlärm
                  </td>
                </tr>
                <tr>
                  <td class="px-3 py-2">WHO-Empfehlung Aussen</td>
                  <td class="px-3 py-2">&lt; 53 dB tagsüber</td>
                  <td class="px-3 py-2">Gesundheitsschutz</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>

    <article
      v-if="selectedChapter === 'overview'"
      class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
    >
      <h2 class="text-center text-lg font-semibold text-slate-900">
        Übersicht: Messgrössen auf einen Blick
      </h2>

      <div
        class="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white"
      >
        <table
          class="w-full min-w-[860px] border-collapse text-left text-sm leading-6"
        >
          <thead class="bg-slate-100 text-slate-900">
            <tr>
              <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                Parameter
              </th>
              <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                Messgerät / Methode
              </th>
              <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                Einheit
              </th>
              <th class="border-b border-slate-200 px-3 py-2 font-semibold">
                Richtwert
              </th>
            </tr>
          </thead>
          <tbody class="text-slate-700">
            <tr>
              <td class="border-b border-slate-200 px-3 py-2">CO₂</td>
              <td class="border-b border-slate-200 px-3 py-2">
                Bosean (MOX-Sensor)
              </td>
              <td class="border-b border-slate-200 px-3 py-2">ppm</td>
              <td class="border-b border-slate-200 px-3 py-2">
                &lt; 800 ppm (gut)
              </td>
            </tr>
            <tr>
              <td class="border-b border-slate-200 px-3 py-2">
                Feinstaub PM2.5
              </td>
              <td class="border-b border-slate-200 px-3 py-2">
                Bosean (Laser)
              </td>
              <td class="border-b border-slate-200 px-3 py-2">µg/m³</td>
              <td class="border-b border-slate-200 px-3 py-2">
                &lt; 5 µg/m³ (WHO Jahresmittel)
              </td>
            </tr>
            <tr>
              <td class="border-b border-slate-200 px-3 py-2">
                Feinstaub PM10
              </td>
              <td class="border-b border-slate-200 px-3 py-2">
                Bosean (Laser)
              </td>
              <td class="border-b border-slate-200 px-3 py-2">µg/m³</td>
              <td class="border-b border-slate-200 px-3 py-2">
                &lt; 15 µg/m³ (WHO Jahresmittel)
              </td>
            </tr>
            <tr>
              <td class="border-b border-slate-200 px-3 py-2">
                Elektrisches Feld
              </td>
              <td class="border-b border-slate-200 px-3 py-2">ME 3851A</td>
              <td class="border-b border-slate-200 px-3 py-2">V/m</td>
              <td class="border-b border-slate-200 px-3 py-2">
                &lt; 5000 V/m (50 Hz)
              </td>
            </tr>
            <tr>
              <td class="border-b border-slate-200 px-3 py-2">
                Magnetisches Feld
              </td>
              <td class="border-b border-slate-200 px-3 py-2">ME 3851A</td>
              <td class="border-b border-slate-200 px-3 py-2">nT / µT</td>
              <td class="border-b border-slate-200 px-3 py-2">
                &lt; 200 µT (50 Hz)
              </td>
            </tr>
            <tr>
              <td class="px-3 py-2">Lärm</td>
              <td class="px-3 py-2">Decibel Pro App</td>
              <td class="px-3 py-2">dB</td>
              <td class="px-3 py-2">&lt; 53 dB (WHO, aussen)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </section>
</template>
