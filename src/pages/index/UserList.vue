<template>
  <div>
    <table class="table">
      <tr>
        <th class="w-1/12 text-right">ID</th>
        <th class="w-2/12 text-left">名前</th>
        <th class="w-2/12 text-left">ログインID</th>
      </tr>
      <tbody v-if="!store.isPending()">
        <tr v-for="u in store.getUserList()" :key="u.id">
          <td class="text-right">{{ u.id }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.loginId }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">Loading...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { UserListStore, UserListStoreKey } from './UserListStore'

export default defineComponent({
  setup() {
    const store = inject<UserListStore>(UserListStoreKey)!

    return {
      store,
    }
  },
})
</script>

<style scoped>
.table {
}

.table th {
  @apply p-1 bg-blue-200;
}
.table td {
  @apply p-1;
}
</style>
