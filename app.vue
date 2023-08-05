<script setup lang="ts">
import { appName } from '~/constants'
import '@unocss/reset/tailwind.css'
import '~/assets/css/main.css'
import '~/assets/css/prose.css'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
} */
</style>
