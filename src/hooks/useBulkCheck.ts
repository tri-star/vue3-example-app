import { computed, reactive, toRef, watch } from 'vue'
import _isEqual from 'lodash.isequal'

export const useBulkCheck = () => {
  const state = reactive<{
    checkedItems: number[]
    idList: number[]
  }>({
    checkedItems: [],
    idList: [],
  })

  const initialize = (idList: number[], initialCheckedItems?: number[]) => {
    state.checkedItems = []
    state.idList = [...idList]
    if (initialCheckedItems) {
      state.checkedItems = [...initialCheckedItems]
    }
  }

  const toggle = (id: number) => {
    if (!state.checkedItems.includes(id)) {
      state.checkedItems.push(id)
    } else {
      state.checkedItems = state.checkedItems.filter((v) => {
        return v !== id
      })
    }
  }

  const allChecked = computed({
    get: () => {
      return _isEqual(state.checkedItems.sort(), state.idList.sort())
    },
    set: (newCheckState) => {
      if (newCheckState) {
        state.checkedItems = [...state.idList]
      } else {
        state.checkedItems = []
      }
    },
  })

  return {
    state,
    initialize,
    toggle,
    allChecked,
  }
}
