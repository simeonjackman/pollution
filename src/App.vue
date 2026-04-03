<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="grid grid-cols-1 gap-2">
      <RouterLink
        to="/introduction"
        class="bg-blue-800 p-3 text-center text-base text-white transition active:scale-[0.99]"
        active-class="!bg-blue-600"
      >
        Introduction
      </RouterLink>
      <RouterLink
        to="/data-uploader"
        class="bg-blue-800 p-3 text-center text-base text-white transition active:scale-[0.99]"
        active-class="!bg-blue-600"
      >
        Data Uploader
      </RouterLink>
      <RouterLink
        to="/data-analysis"
        class="bg-blue-800 p-3 text-center text-base text-white transition active:scale-[0.99]"
        active-class="!bg-blue-600"
      >
        Analysis
      </RouterLink>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>
