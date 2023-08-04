<template>
  <main class="px7 py10">
    <slot />
    <Footer />
    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      {{ new Date().getFullYear() }} © Zeke Chow.
    </div>
  </main>
</template>
