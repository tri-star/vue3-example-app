<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <div id="loading-modal"></div>
  </component>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AuthHandlerInterface, AuthHandlerInterfaceKey } from './domain/AuthHandlerInterface'

export default defineComponent({
  setup() {
    const route = useRoute()
    let layout = ref<string>('DefaultLayout')
    const router = useRouter()
    const authHandler = inject<AuthHandlerInterface>(AuthHandlerInterfaceKey)!

    router.beforeEach((to, from, next) => {
      //認証状態を確認する(本来は1分程度キャッシュするなどが必要)
      //認証OKなら抜ける
      //認証NGならログインページに飛ばす
      authHandler.getUser().then((user) => {
        if (to.meta.allowGuest) {
          next()
          return
        }

        if (user) {
          next()
          return
        }
        next({ name: 'login' })
      })
    })

    router.afterEach(() => {
      layout.value = route.meta.layout ?? 'DefaultLayout'
    })

    return {
      layout,
    }
  },
})
</script>

<style>
.page-enter-active {
  animation: fadeIn 0.3s ease-in;
  animation-delay: 0.3s;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.page-leave-active {
  animation: fadeOut 0.3s ease-in;
}

@keyframes fadeOut {
  from {
  }
  to {
    opacity: 0;
  }
}
</style>
