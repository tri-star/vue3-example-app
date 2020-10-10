import { computed, reactive, toRef, watch } from 'vue'

export const useBulkCheck = () => {
  const state = reactive<{
    allCheck: boolean
    checkedItems: Record<number, boolean>
    idList: number[]
  }>({
    allCheck: false,
    checkedItems: {},
    idList: [],
  })

  const initialize = (idList: number[], initialCheckedItems?: number[]) => {
    state.checkedItems = {}
    state.idList = [...idList]
    if (initialCheckedItems) {
      initialCheckedItems.forEach((id) => {
        state.checkedItems[id] = true
      })
    }
  }

  const toggle = (id: number) => {
    if (state.checkedItems[id] !== undefined) {
      state.checkedItems[id] = false
    } else {
      state.checkedItems[id] = true
    }
  }

  const toggleAll = () => {
    state.allCheck = !state.allCheck
  }

  watch(
    () => state.allCheck,
    () => {
      if (state.allCheck) {
        state.checkedItems = {}
        state.idList.forEach((id) => {
          state.checkedItems[id] = true
        })
      } else {
        state.checkedItems = {}
      }
    }
  )

  return {
    state,
    initialize,
    toggle,
    toggleAll,
  }
}
