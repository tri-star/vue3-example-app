<template>
  <DefaultLayout>
    <template #default>
      <ExPageHeader :title="'ユーザー登録'" />
      <ExAlert :message="'ユーザーを登録しました'" :visible="state.showTips" />
      <div class="form">
        <div class="form-row">
          <div class="form-header w-2/12">ユーザー名</div>
          <div class="form-col w-6/12">
            <ExInput v-model="state.form.name" :class="{ 'w-full': 1, 'form-error': validator.hasError('name') }" />
            <div v-if="validator.hasError('name')">
              <p v-for="(message, i) in validator.getMessages('name')" :key="i" class="form-error-message">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-header w-2/12">ログインID</div>
          <div class="form-col w-6/12">
            <ExInput
              v-model="state.form.loginId"
              :class="{ 'w-full': 1, 'form-error': validator.hasError('loginId') }"
            />
            <div v-if="validator.hasError('loginId')">
              <p v-for="(message, i) in validator.getMessages('loginId')" :key="i" class="form-error-message">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-col mx-auto">
            <ExButton :title="'登録'" class="mr-3" :disabled="validator.isError()" @onclick="onRegisterClicked" />
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
import { computed, defineComponent, watch } from 'vue'
import ExInput from '@/components/ExInput.vue'
import { useRouter } from 'vue-router'
import { UserFormStore } from './UserFormStore'
import { useValidator } from '@/hooks/useValidator'
import { UserRegisterRuleCollection } from '@/domain/User'

export default defineComponent({
  components: {
    ExInput,
  },
  setup() {
    const router = useRouter()
    const userFormStore = new UserFormStore()
    const state = userFormStore.state
    const userRegisterHandler = userFormStore.userRegisterHandler
    const validator = useValidator()

    validator.setInitialData(state.form)

    const onCancelClicked = () => {
      router.back()
    }
    const onRegisterClicked = () => {
      userFormStore.register()
    }

    const ruleCollection = new UserRegisterRuleCollection()

    watch(state.form, () => {
      validator.validate(state.form, ruleCollection)
    })

    const isPending = computed(() => {
      return userRegisterHandler.isPending()
    })

    return {
      state,
      onCancelClicked,
      onRegisterClicked,
      userRegisterHandler,
      isPending,
      validator,
    }
  },
})
</script>
