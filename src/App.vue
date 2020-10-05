<template>
  <router-view v-slot="{ Component }">
    <transition name="page">
      <component :is="Component" />
    </transition>
  </router-view>
  <div id="loading-modal"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style>
.page-enter-active {
  animation: fadeIn 0.3s ease-in;
  animation-delay: 0.3s;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.page-leave-active {
  animation: fadeOut 0.3s ease-in;
}

@keyframes fadeOut {
  from {
  }
  to {
    opacity: 0;
  }
}
</style>
