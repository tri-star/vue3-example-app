<template>
  <DefaultLayout>
    <template #default>
      <ExPageHeader :title="'ユーザー登録'" />
      <ExAlert :message="'ユーザーを登録しました'" :visible="state.showTips" />
      <div class="form">
        <div class="form-row">
          <div class="form-header w-2/12">ユーザー名</div>
          <div class="form-col w-6/12"><ExInput v-model="state.form.name" class="w-full" /></div>
        </div>
        <div class="form-row">
          <div class="form-header w-2/12">ログインID</div>
          <div class="form-col w-6/12"><ExInput v-model="state.form.loginId" class="w-full" /></div>
        </div>
        <div class="form-row">
          <div class="form-col mx-auto">
            <ExButton :title="'登録'" class="mr-3" @onclick="onRegisterClicked" />
            <ExButton :title="'キャンセル'" @onclick="onCancelClicked" />
          </div>
        </div>
      </div>
      <teleport to="#loading-modal">
        <ExLoadingModal v-if="isPending" />
      </teleport>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ExInput from '@/components/ExInput.vue'
import { useRouter } from 'vue-router'
import { UserFormStore } from './UserFormStore'

export default defineComponent({
  components: {
    ExInput,
  },
  setup() {
    const router = useRouter()
    const userFormStore = new UserFormStore()
    const state = userFormStore.state
    const userRegisterHandler = userFormStore.userRegisterHandler

    const onCancelClicked = () => {
      router.back()
    }
    const onRegisterClicked = () => {
      userFormStore.register()
    }

    const isPending = computed(() => {
      return userRegisterHandler.isPending()
    })

    return {
      state,
      onCancelClicked,
      onRegisterClicked,
      userRegisterHandler,
      isPending,
    }
  },
})
</script>
