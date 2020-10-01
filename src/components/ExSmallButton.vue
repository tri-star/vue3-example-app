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
  @apply border rounded px-3 py-1 bg-gray-200 border-gray-100 text-sm;
  box-shadow: 0 2px rgba(0, 0, 0, 30%);
}

button:active {
  @apply bg-gray-300 relative border-gray-100;
  top: 2px;
  box-shadow: none;
}
</style>
