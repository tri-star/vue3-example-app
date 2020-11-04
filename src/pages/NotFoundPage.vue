<template>
  <div>
    <ExPageHeader :title="'エラー'" />

    <div>{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const message = route.params.message

    return {
      message,
    }
  },
})
</script>
