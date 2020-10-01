<template>
  <DefaultLayout>
    <template #default>
      <div class="flex flex-col">
        <ExPageHeader :title="'ユーザー管理'" class="mb-3" />
        <UserSearchForm class="mb-3" />
        <UserList />
      </div>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, provide, watch } from 'vue'
import { UserListStore, UserListStoreKey } from './UserListStore'
import UserList from './UserList.vue'
import UserSearchForm from './UserSearchForm.vue'

export default defineComponent({
  components: {
    UserList,
    UserSearchForm,
  },
  setup() {
    const userListStore = new UserListStore()
    provide(UserListStoreKey, userListStore)

    const route = useRoute()

    watch(
      () => route.query,
      () => {
        let page = 1
        if (route.query.page != null) {
          page = Number.parseInt(route.query['page'] as string)
        }

        userListStore.paginator.setPage(page)
        userListStore.loadUserList()
      },
      {
        immediate: true,
      }
    )

    return {}
  },
})
</script>
