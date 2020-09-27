<template>
  <button @click="$emit('onclick')">{{ title }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  emits: ['onclick'],
})
</script>

<style scoped>
button {
  @apply border rounded px-5 py-2 bg-gray-200;
}

button:active {
  @apply bg-gray-300 pt-3 pb-1;
}
</style>
