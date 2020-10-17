<template>
  <div class="w-6/12 mx-auto my-20">
    <h1 class="text-6xl w-full text-center mb-10">Example App</h1>
    <div class="form">
      <div class="form-row">
        <div class="form-header w-3/12">ログインID</div>
        <div class="form-col w-9/12">
          <ExInput v-model="state.form.loginId" class="w-full" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-header w-3/12">パスワード</div>
        <div class="form-col w-9/12">
          <ExInput v-model="state.form.password" :type="'password'" class="w-full" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-col mx-auto">
          <ExButton :title="'ログイン'" class="mr-3" :disabled="validator.isError()" @onclick="onLoginClicked" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useValidator } from '@/hooks/useValidator'
import { constraints } from '@/lib/validator/constraints'
import { RuleCollection } from '@/lib/validator/Rule'
import { defineComponent, inject, reactive, watch } from 'vue'
import ExInput from '@/components/ExInput.vue'
import { AuthHandlerInterface, AuthHandlerInterfaceKey } from '@/domain/AuthHandlerInterface'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    ExInput,
  },
  setup() {
    const state = reactive({
      form: {
        loginId: '',
        password: '',
      },
    })

    const authHandler = inject<AuthHandlerInterface>(AuthHandlerInterfaceKey)!
    const router = useRouter()
    const validator = useValidator()
    const rules = new RuleCollection({
      loginId: {
        required: constraints.required(),
      },
      password: {
        required: constraints.required(),
      },
    })
    validator.setInitialData(state.form)

    watch(state.form, () => {
      validator.validate(state.form, rules)
    })

    const onLoginClicked = async () => {
      const logined = await authHandler.login(state.form.loginId, state.form.password)
      if (!logined) {
        return
      }

      router.push({ name: 'index' })
    }

    return { state, onLoginClicked, validator }
  },
})
</script>
