<template>
  <div :class="['side-menu', currentSideMenuMode]">
    <ul v-if="isNormalMode">
      <li @click="toggleMenu">
        <div class="flex">
          <a class="material-icons" role="menuitem">menu</a>
        </div>
      </li>
      <li>
        <RouterLink :to="{ name: 'index' }" class="flex">
          <span class="material-icons" role="menuitem">people</span>
          <span class="mx-1">ユーザー管理</span>
        </RouterLink>
      </li>
    </ul>
    <ul v-if="isNarrowMode">
      <li @click="toggleMenu">
        <div class="flex">
          <a class="material-icons" role="menuitem">menu</a>
        </div>
      </li>
      <li>
        <RouterLink :to="{ name: 'index' }" class="flex">
          <span class="material-icons" role="menuitem">people</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export const SideMenuModes = {
  NORMAL: 'NORMAL',
  SMALL: 'SMALL',
} as const
export type SideMenuMode = typeof SideMenuModes[keyof typeof SideMenuModes]

export default defineComponent({
  setup() {
    const sideMenuMode = ref<SideMenuMode>(SideMenuModes.NORMAL)

    const currentSideMenuMode = computed(() => {
      return sideMenuMode.value == SideMenuModes.NORMAL ? 'side-menu-normal' : 'side-menu-narrow'
    })
    const isNormalMode = computed(() => {
      return sideMenuMode.value == SideMenuModes.NORMAL
    })
    const isNarrowMode = computed(() => {
      return sideMenuMode.value == SideMenuModes.SMALL
    })

    const toggleMenu = () => {
      sideMenuMode.value = sideMenuMode.value == SideMenuModes.NORMAL ? SideMenuModes.SMALL : SideMenuModes.NORMAL
    }

    return {
      currentSideMenuMode,
      isNormalMode,
      isNarrowMode,
      toggleMenu,
    }
  },
})
</script>

<style scoped>
.side-menu {
  @apply bg-gray-800;
}

.side-menu li {
  @apply p-3 my-1 bg-opacity-75 bg-gray-500 cursor-pointer;
  transition: background-color 0.3s ease-out;
  overflow: hidden;
  overflow-wrap: normal;
  word-break: keep-all;
}

.side-menu li:hover {
  @apply bg-gray-300;
}

.side-menu-normal {
  width: 250px;
  overflow: hidden;
  transition: all 0.3s ease-out;
}

.side-menu-narrow {
  width: 50px;
  overflow: hidden;
  transition: all 0.3s ease-out;
}
</style>
