<template>
  <div>
    <transition name="float-tip">
      <div v-if="visible" class="float-tip bg-green-300 p-3 my-3 rounded-md w-full">{{ title }}</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
.float-tip-enter-active,
.float-tip-leave-active {
  transition: all 0.5s ease;
}

.float-tip-enter-from,
.float-tip-leave-to {
  opacity: 0;
  height: 0;
}

.float-tip {
  height: 50px;
}
</style>
