<script setup lang="ts">
interface Props {
  name: string
  desc: string
  link: string
  path: string
  gif: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card-wrapper">
    <NuxtLink
      :href="props.link || '/panorama'"
      border="~ base rounded-lg"
      class="group"
      hover="scale-101 shadow-xl z-10" relative block of-hidden transition-all duration-500 bg-base
    >
      <template v-if="gif">
        <img :src="path" alt="panorama" w-full border="b base">
      </template>
      <template v-else>
        <video
          src="https://antfu.me/assets/2023-06-23-7430df9f.mp4"
          autoplay loop muted playsinline
          w-full border="b base"
        />
      </template>
      <div class="prose-sm m0 p4 pb3 prose">
        <div class="slide-enter-content m-auto prose">
          <p>{{ name }}</p>
          <p>
            {{ desc }}
          </p>
        </div>
        <!-- <div pt2 text-sm op50>
          June 23
        </div> -->
      </div>
    </NuxtLink>
  </div>
</template>
