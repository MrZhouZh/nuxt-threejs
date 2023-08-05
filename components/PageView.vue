<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

// fix: dynamic component in nuxt3
// refs: https://stackoverflow.com/questions/73025338/i-cant-use-dynamic-components-in-nuxt-3
const Card = resolveComponent('Card')

const demoItems = Array.from({ length: 3 }).map((_, i) => ({
  comp: Card,
  name: `card-${i}`,
  link: Math.random() >= 0.5 ? '/panorama' : '/periodictable',
}))

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof demoItems)
  demoItems.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
</script>

<template>
  <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
    <div v-for="items, idx of parts" :key="idx" flex="~ col gap-4">
      <component
        :is="comp"
        v-for="{ comp, name, link } of items"
        :key="name"
        class="slide-enter"
        :link="link"
        :style="{
          '--enter-stage': idx + 1,
        }"
      />
    </div>
  </div>
</template>
