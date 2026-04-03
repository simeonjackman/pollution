<script setup>
import { ref } from "vue";

const props = defineProps({
  groupTag: {
    type: String,
    default: "FHNW-BNE-Projekt",
  },
});

const isDownloading = ref(false);
const downloadStatus = ref("");

function toCsvField(value) {
  const raw = value ?? "";
  const str = String(raw);
  return `"${str.replaceAll('"', '""')}"`;
}

async function downloadData() {
  if (isDownloading.value) {
    return;
  }

  isDownloading.value = true;
  downloadStatus.value = "Daten werden vorbereitet...";

  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const toDate = now.toISOString();
  const fromDate = oneMonthAgo.toISOString();

  try {
    const boxSearchParams = new URLSearchParams({
      grouptag: props.groupTag,
      format: "json",
      limit: "20",
    });
    const boxesRes = await fetch(
      `https://api.opensensemap.org/boxes?${boxSearchParams}`,
    );
    if (!boxesRes.ok) {
      throw new Error(
        `Boxen fuer Grouptag ${props.groupTag} konnten nicht geladen werden (${boxesRes.status}).`,
      );
    }

    const boxes = await boxesRes.json();
    const boxIds = (Array.isArray(boxes) ? boxes : []).map((box) => box._id);
    if (!boxIds.length) {
      throw new Error(`Keine Boxen fuer Grouptag ${props.groupTag} gefunden.`);
    }

    const exportData = [];

    for (const boxId of boxIds) {
      const boxRes = await fetch(`https://api.opensensemap.org/boxes/${boxId}`);
      if (!boxRes.ok) {
        throw new Error(
          `Box ${boxId} konnte nicht geladen werden (${boxRes.status}).`,
        );
      }

      const box = await boxRes.json();

      for (const sensor of box.sensors || []) {
        const params = new URLSearchParams({
          "from-date": fromDate,
          "to-date": toDate,
          format: "json",
        });
        const dataUrl = `https://api.opensensemap.org/boxes/${boxId}/data/${sensor._id}?${params}`;
        const dataRes = await fetch(dataUrl);
        if (!dataRes.ok) {
          throw new Error(
            `Messdaten fuer Sensor ${sensor._id} konnten nicht geladen werden (${dataRes.status}).`,
          );
        }

        const measurements = await dataRes.json();
        exportData.push({
          boxId,
          boxName: box.name,
          sensorId: sensor._id,
          sensorTitle: sensor.title,
          sensorUnit: sensor.unit,
          measurements,
        });
      }
    }

    const header = [
      "groupTag",
      "boxId",
      "boxName",
      "sensorId",
      "sensorTitle",
      "sensorUnit",
      "createdAt",
      "value",
      "lat",
      "lon",
      "height",
    ];

    const rows = [header.join(",")];
    for (const item of exportData) {
      for (const measurement of item.measurements || []) {
        const location = Array.isArray(measurement.location)
          ? measurement.location
          : [];
        const row = [
          props.groupTag,
          item.boxId,
          item.boxName,
          item.sensorId,
          item.sensorTitle,
          item.sensorUnit,
          measurement.createdAt ?? "",
          measurement.value ?? "",
          location[1] ?? "",
          location[0] ?? "",
          location[2] ?? "",
        ].map(toCsvField);
        rows.push(row.join(","));
      }
    }

    const csvContent = rows.join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `pollution-data-${now.toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    downloadStatus.value = "Download erfolgreich gestartet.";
  } catch (err) {
    downloadStatus.value = `Download fehlgeschlagen: ${err.message}`;
  } finally {
    isDownloading.value = false;
  }
}
</script>

<template>
  <div class="space-y-3">
    <button
      @click="downloadData"
      :disabled="isDownloading"
      class="h-12 w-full cursor-pointer rounded-xl bg-slate-700 text-base text-white"
    >
      {{
        isDownloading
          ? "⏳ Daten werden heruntergeladen..."
          : "⬇️ Alle Daten Herunterladen"
      }}
    </button>

    <p v-if="downloadStatus" class="text-sm text-slate-700">
      {{ downloadStatus }}
    </p>
  </div>
</template>
