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
  @apply border rounded px-5 py-2 bg-gray-200 border-gray-100;
  box-shadow: 0 3px rgba(0, 0, 0, 30%);
}

button:active {
  @apply bg-gray-300 relative border-gray-100;
  top: 3px;
  box-shadow: none;
}
</style>
