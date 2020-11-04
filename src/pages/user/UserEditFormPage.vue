<template>
  <ExPageHeader :title="'ユーザー編集'" />
  <ExAlert :message="'ユーザーを更新しました'" :visible="state.showTips" />
  <div class="form">
    <div class="form-row">
      <div class="form-header w-2/12">ユーザー名</div>
      <div class="form-col w-6/12">
        <ExInput v-model="state.form.name" :class="{ 'w-full': 1, 'form-error': isNameError }" />
        <div v-if="isNameError">
          <p v-for="(message, i) in state.errors['name']" :key="i" class="form-error-message">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-header w-2/12">ログインID</div>
      <div class="form-col w-6/12">
        <ExInput v-model="state.form.loginId" :class="{ 'w-full': 1, 'form-error': isLoginIdError }" />
        <div v-if="isLoginIdError">
          <p v-for="(message, i) in state.errors['loginId']" :key="i" class="form-error-message">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-col mx-auto">
        <ExButton title="更新" class="mr-3" :disabled="isFormError" @onclick="onEditClicked" />
        <ExButton :title="'キャンセル'" @onclick="onCancelClicked" />
      </div>
    </div>
  </div>
  <teleport to="#loading-modal">
    <ExLoadingModal v-if="isPending" />
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import ExInput from '@/components/ExInput.vue'
import { useRoute, useRouter } from 'vue-router'
import { UserEditFormStore } from './UserEditFormStore'

export default defineComponent({
  components: {
    ExInput,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userFormStore = new UserEditFormStore()
    const state = userFormStore.state
    const userRegisterHandler = userFormStore.userEditHandler

    const id: number = Number(route.params.id ?? 0)
    //TODO: 見つからない場合ResourceNotFoundErrorを投げる

    userFormStore.initialize(id).catch((reason) => {
      console.error(reason)
      router.replace({ name: 'notfound', params: { message: '無効なユーザーが指定されました' } })
    })

    const onCancelClicked = () => {
      router.back()
    }
    const onEditClicked = () => {
      userFormStore.edit()
    }

    watch(state.form, () => {
      userFormStore.validate()
    })

    const isPending = computed(() => {
      return userRegisterHandler.isPending()
    })

    const isNameError = computed(() => {
      return 'name' in state.errors
    })
    const isLoginIdError = computed(() => {
      return 'loginId' in state.errors
    })
    const isFormError = computed(() => {
      return Object.keys(state.errors).length > 0
    })

    return {
      state,
      onCancelClicked,
      onEditClicked,
      userRegisterHandler,
      isPending,
      isNameError,
      isLoginIdError,
      isFormError,
    }
  },
})
</script>
