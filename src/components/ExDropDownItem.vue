<template>
  <li class="hover:bg-blue-100 cursor-pointer" role="menuitem">
    <a class="px-4 py-2 block w-full h-full box-border" @click="onClicked">{{ title }}</a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    menuId: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
  setup(props, context) {
    const onClicked = () => {
      context.emit('click', props.menuId)
    }

    return {
      onClicked,
    }
  },
})
</script>
