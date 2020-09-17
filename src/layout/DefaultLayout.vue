<template>
<div class="box-content flex">
  <header>
    <h1>Example app</h1>
  </header>
  <slot></slot>
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
