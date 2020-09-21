<template>
  <div>
    <table class="">
      <tr>
        <th>ID</th>
        <th>名前</th>
        <th>ログインID</th>
      </tr>
      <tbody v-if="!store.isPending()">
        <tr v-for="u in store.getUserList()" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.loginId }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr colspan="3">
          <td>Loading...</td>
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
