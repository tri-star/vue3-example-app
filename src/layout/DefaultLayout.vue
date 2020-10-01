<template>
  <div class="mx-auto">
    <div class="flex flex-col items-center">
      <header class="flex items-center w-full p-4 bg-blue-900">
        <h1 class="mr-3 text-2xl text-white">Example app</h1>
        <div class="items-end flex-grow text-right">
          <a href=""><span class="text-white material-icons">account_circle</span></a>
        </div>
      </header>
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
