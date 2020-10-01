<template>
  <div>
    <div>
      <div class="flex items-center space-x-3">
        <div class="flex">計： {{ store.state.totalCount }}件</div>
        <div class="flex-grow my-2">
          <ExSmallButton :title="'新規登録'" @click="onRegisterClicked" />
        </div>
        <ExPaginator
          class="my-2 flex-grow-0 justify-items-end"
          :route-name="'index'"
          :pages="paginator.getPageLinks()"
          :current-page="paginator.getPage()"
        />
      </div>
    </div>
    <table class="table">
      <tr>
        <th class="w-1/12 text-center"><input type="checkbox" /></th>
        <th class="w-1/12 text-right">ID</th>
        <th class="w-2/12 text-left">名前</th>
        <th class="w-2/12 text-left">ログインID</th>
        <th class="w-8/12 text-left"></th>
      </tr>
      <tbody v-if="userListLoader.isPending()">
        <tr>
          <td colspan="5">Loading...</td>
        </tr>
      </tbody>
      <tbody v-else-if="userListLoader.isDone()">
        <tr v-for="u in store.state.userList" :key="u.id">
          <td class="text-center"><input type="checkbox" /></td>
          <td class="text-right">{{ u.id }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.loginId }}</td>
          <td></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5">ロードに失敗しました<button @click="onRetryClicked">再試行</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { UserListStore, UserListStoreKey } from './UserListStore'
import ExPaginator from '@/components/ExPaginator.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    ExPaginator,
  },
  setup() {
    const store = inject<UserListStore>(UserListStoreKey)!
    const userListLoader = store.userListLoader
    const paginator = store.paginator
    const router = useRouter()

    const onRetryClicked = () => {
      store.loadUserList()
    }

    const onRegisterClicked = () => {
      router.push({ name: 'user-register' })
    }

    return {
      store,
      userListLoader,
      onRetryClicked,
      onRegisterClicked,
      paginator,
    }
  },
})
</script>

<style scoped>
.table {
  @apply w-full;
}

.table th {
  @apply p-1 bg-blue-200;
}
.table td {
  @apply p-1;
}
</style>
