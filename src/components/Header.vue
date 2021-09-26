<script setup>
  defineProps({
    named: String,
    animal: Object,
  })
</script>

<template>
  <div class="font-sans uppercase mt-md mt-2">header {{ named }}</div>
  <p>{{ animal.name }}</p>
</template>
