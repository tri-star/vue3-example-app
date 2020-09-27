<template>
  <div class="form">
    <div class="form-row">
      <div class="form-header w-2/12">ユーザー名</div>
      <div class="form-col w-6/12"><ExInput v-model="state.searchForm.userName" class="w-full" /></div>
    </div>
    <div class="form-row">
      <div class="form-header w-2/12">ログインID</div>
      <div class="form-col w-6/12"><ExInput v-model="state.searchForm.loginId" class="w-full" /></div>
    </div>
    <div class="form-row">
      <div class="form-col mx-auto"><button @click="store.loadUserList">検索</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import ExInput from '@/components/ExInput.vue'
import { UserListStore, UserListStoreKey } from './UserListStore'

export default defineComponent({
  components: {
    ExInput,
  },
  setup() {
    const store = inject<UserListStore>(UserListStoreKey)!
    const state = store.state

    return {
      store,
      state,
    }
  },
})
</script>

<style>
.form {
  @apply flex flex-col;
}

.form-row {
  @apply flex flex-row items-center;
}

.form-header {
  @apply bg-gray-100 p-2;
}

.form-col {
  @apply p-2;
}
</style>
