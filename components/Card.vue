<script setup lang="ts">
//
</script>

<template>
  <div class="card-wrapper">
    <div
      border="~ base rounded-lg"
      class="group"
      hover="scale-101 shadow-xl z-10" bg-base relative block of-hidden transition-all duration-500
    >
      <video
        src="https://antfu.me/assets/2023-06-23-7430df9f.mp4"
        autoplay loop muted playsinline
        w-full border="b base"
      />
      <div class="prose-sm m0 p4 pb3 prose">
        <div class="slide-enter-content m-auto prose">
          <p>The upcoming Picture-in-Picture API that Chrome is pushing is soo promising! 🤩</p>
          <p>
            <a href="https://github.com/nuxt/devtools" target="_blank" rel="noopener noreferrer">
              <span i-logos-nuxt-icon />
              Nuxt DevTools
            </a>
            is now able to pop up as a separate window!
          </p>
        </div>
        <div pt2 text-sm op50>
          June 23
        </div>
      </div>
    </div>
  </div>
</template>
