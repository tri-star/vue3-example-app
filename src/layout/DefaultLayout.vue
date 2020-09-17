<template>
<div class="container mx-auto">
  <div class="flex items-start flex-col">
    <header class="flex items-center bg-blue-900 p-4 w-full">
      <h1 class="text-white text-2xl mr-3">Example app</h1>
      <div class="items-end flex-grow text-right">
        <a href=""><span class="text-white material-icons">account_circle</span></a>
      </div>
    </header>
    <div class="p-2">
      <slot></slot>
    </div>
  </div>
</div>
</template>


<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  setup() {
    return {}
  }
})

</script>
