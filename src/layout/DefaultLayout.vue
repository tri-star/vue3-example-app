<template>
  <div class="mx-auto">
    <div class="flex flex-col items-center">
      <header class="flex items-center w-full p-4 bg-blue-900">
        <h1 class="mr-3 text-2xl text-white">Example app</h1>
        <div class="items-end flex-grow text-right">
          <a id="account" @click="onIconClicked">
            <span class="text-white material-icons cursor-pointer">account_circle</span>
          </a>
          <ExDropDown v-model:show="showMenu" :target="'#account'">
            <ExDropDownItem menu-id="profile" title="プロフィール" @click="onMenuClicked" />
            <ExDropDownItem menu-id="setting" title="設定" @click="onMenuClicked" />
            <ExDropDownItemSeparator />
            <ExDropDownItem menu-id="logout" title="ログアウト" @click="onMenuClicked" />
          </ExDropDown>
        </div>
      </header>
      <div class="container w-11/12 pt-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import ExDropDown from '@/components/ExDropDown.vue'
import ExDropDownItem from '@/components/ExDropDownItem.vue'
import ExDropDownItemSeparator from '@/components/ExDropDownItemSeparator.vue'
import { useRouter } from 'vue-router'
import { AuthHandlerInterfaceKey, AuthHandlerInterface } from '@/domain/AuthHandlerInterface'

export default defineComponent({
  components: {
    ExDropDown,
    ExDropDownItem,
    ExDropDownItemSeparator,
  },
  setup() {
    const showMenu = ref(false)
    const router = useRouter()
    const authHandler = inject<AuthHandlerInterface>(AuthHandlerInterfaceKey)!

    const onIconClicked = () => {
      showMenu.value = !showMenu.value
    }
    const onMenuClicked = async (menuId: string) => {
      switch (menuId) {
        case 'logout':
          await authHandler.logout()
          router.push({ name: 'login' })
          break
      }
      showMenu.value = false
    }

    return {
      showMenu,
      onIconClicked,
      onMenuClicked,
    }
  },
})
</script>
