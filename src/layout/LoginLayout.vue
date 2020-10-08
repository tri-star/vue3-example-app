<template>
  <div class="mx-auto h-full bg-gradient-to-br from-gray-100 to-blue-200">
    <div class="flex flex-col items-center">
      <div class="container w-11/12 pt-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
