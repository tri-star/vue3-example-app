<template>
  <ul class="flex justify-end space-x-2">
    <li v-for="page in pages" :key="page" class="">
      <RouterLink :to="{ name: routeName, query: { page: page } }" :class="{ active: isCurrentPage(page) }">{{
        page
      }}</RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    routeName: {
      type: String,
      required: true,
    },
    pages: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isCurrentPage = (page: any) => {
      return Number.parseInt(page) == props.currentPage
    }

    return {
      isCurrentPage,
    }
  },
})
</script>

<style scoped>
li a {
  @apply block px-2 py-1 border border-blue-200;
}

li a.active {
  @apply bg-blue-100 border-blue-300 font-bold;
}
</style>
