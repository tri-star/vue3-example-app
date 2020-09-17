<template>
  <div>
    <router-link :to="{ path: '/' }">Home</router-link>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const count = ref(0)
    const inc = () => {
      count.value++
    }
    return {
      count,
      inc
    }
  }
})
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>