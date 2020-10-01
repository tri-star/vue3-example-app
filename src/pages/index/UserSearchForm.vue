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
      <div class="form-col mx-auto">
        <ExButton :title="'検索'" @onclick="onSearchButtonCliked" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import ExInput from '@/components/ExInput.vue'
import ExButton from '@/components/ExButton.vue'
import { UserListStore, UserListStoreKey } from './UserListStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    ExInput,
    ExButton,
  },
  setup() {
    const store = inject<UserListStore>(UserListStoreKey)!
    const state = store.state
    const router = useRouter()

    const onSearchButtonCliked = () => {
      const query: Record<string, string> = {}

      if (state.searchForm.userName) {
        query['userName'] = state.searchForm.userName
      }
      if (state.searchForm.loginId) {
        query['loginId'] = state.searchForm.loginId
      }

      router.push({
        name: 'index',
        query,
      })
    }

    return {
      store,
      state,
      onSearchButtonCliked,
    }
  },
})
</script>
