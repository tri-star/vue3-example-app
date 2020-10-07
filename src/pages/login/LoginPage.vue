<template>
  <DefaultLayout>
    <template #default>
      <div class="form">
        <div class="form-row">
          <div class="form-header w-2/12">ログインID</div>
          <div class="form-col w-6/12">
            <ExInput v-model="state.form.loginId" class="w-full" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-header w-2/12">パスワード</div>
          <div class="form-col w-6/12">
            <ExInput v-model="state.form.password" :type="'password'" class="w-full" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-col mx-auto">
            <ExButton :title="'ログイン'" class="mr-3" :disabled="validator.isError()" @onclick="onLoginClicked" />
          </div>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { useValidator } from '@/hooks/useValidator'
import { constraints } from '@/lib/validator/constraints'
import { RuleCollection } from '@/lib/validator/Rule'
import { defineComponent, reactive, watch } from 'vue'
import ExInput from '@/components/ExInput.vue'

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

    const onLoginClicked = () => {}

    return { state, onLoginClicked, validator }
  },
})
</script>
