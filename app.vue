<template>
  <div class="relative w-full">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute()
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: 'kom-digital.com'
    },
  ]
}))
</script>