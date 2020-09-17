<template>
  <DefaultLayout>
    <router-view/>
  </DefaultLayout>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'

export default defineComponent({
  components: {
    DefaultLayout
  },
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