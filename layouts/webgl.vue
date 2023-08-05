<template>
  <main>
    <slot />
    <!-- <div class="mx-auto mt-5 text-center text-sm opacity-25">
      {{ new Date().getFullYear() }} © Zeke Chow.
    </div> -->
    <a
      href="https://github.com/MrZhouZh/nuxt-threejs"
      target="_blank" rel="noopener noreferrer"
      flex="~"
      transition="all duration-250 ease-in-out"
      fixed bottom-0 right-0 z-1 items-center p-4 text-2xl color-white-0.8 underline-none
    >
      <i i-carbon-logo-github mr-1 /> @MrZhouZh
    </a>
  </main>
</template>
