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
import { defineComponent, ref } from 'vue'
import ExDropDown from '@/components/ExDropDown.vue'
import ExDropDownItem from '@/components/ExDropDownItem.vue'
import ExDropDownItemSeparator from '@/components/ExDropDownItemSeparator.vue'

export default defineComponent({
  components: {
    ExDropDown,
    ExDropDownItem,
    ExDropDownItemSeparator,
  },
  setup() {
    const showMenu = ref(false)

    const onIconClicked = () => {
      showMenu.value = !showMenu.value
    }
    const onMenuClicked = (menuId: string) => {
      console.log(menuId)
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
