<template>
  <div class="flex flex-col">
    <ExPageHeader :title="'ユーザー管理'" class="mb-3" />
    <UserSearchForm class="mb-3" />
    <UserList />
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, provide, watchEffect } from 'vue'
import ExPageHeader from '@/components/ExPageHeader.vue'
import { UserListStore, UserListStoreKey } from './UserListStore'
import UserList from './UserList.vue'
import UserSearchForm from './UserSearchForm.vue'

export default defineComponent({
  components: {
    ExPageHeader,
    UserList,
    UserSearchForm,
  },
  setup() {
    const userListStore = new UserListStore()
    provide(UserListStoreKey, userListStore)

    const route = useRoute()

    watchEffect(() => {
      if (route.query.page != null) {
        userListStore.paginator.setPage(Number.parseInt(route.query['page'] as string))
      }
      userListStore.loadUserList()
    })

    //userListStore.loadUserList()

    return {}
  },
})
</script>
