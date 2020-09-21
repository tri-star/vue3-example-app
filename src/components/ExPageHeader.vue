<template>
  <h1 class="flex-grow p-3 text-xl bg-gradient-to-br from-blue-100 to-gray-200">{{ title }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
