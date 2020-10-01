<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
  <div id="loading-modal"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'

export default defineComponent({
  components: {
    DefaultLayout,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
