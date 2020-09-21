<template>
  <div class="flex flex-col">
    <ExPageHeader :title="'ユーザー管理'" />
    <UserList />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import ExPageHeader from '@/components/ExPageHeader.vue'
import { UserListStore, UserListStoreKey } from './index/UserListStore'
import UserList from './index/UserList.vue'

export default defineComponent({
  components: {
    ExPageHeader,
    UserList,
  },
  setup() {
    const userListStore = new UserListStore()
    provide(UserListStoreKey, userListStore)

    userListStore.loadUserList()

    return {}
  },
})
</script>
