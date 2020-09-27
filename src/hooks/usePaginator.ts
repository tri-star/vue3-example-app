import { reactive } from 'vue'

export type UsePaginatorResult = {
  update: (totalCount: number, pageSize: number) => void
  getPageLinks: () => Array<number>
  setPage: (newPage: number) => void
  getPage: () => number
}

type usePaginator = () => UsePaginatorResult

export const usePaginator: usePaginator = () => {
  const state = reactive({
    totalCount: 0,
    pageSize: 0,
    currentPage: 1,
    pageLinks: new Array<number>(),
  })
  const update = (totalCount: number, pageSize: number) => {
    state.totalCount = totalCount
    state.pageSize = pageSize
    state.pageLinks = []

    const pages = totalCount / pageSize + (totalCount % pageSize == 0 ? 0 : 1)
    let min = Math.max(1, state.currentPage - 2)
    const max = Math.min(pages, min + 5)
    min = Math.min(min, max - 5)
    for (let i = min; i < max; i++) {
      state.pageLinks.push(i)
    }
  }

  const getPageLinks = () => {
    return state.pageLinks
  }

  const setPage = (newPage: number) => {
    state.currentPage = newPage
  }

  const getPage = () => {
    return state.currentPage
  }

  return {
    update,
    getPageLinks,
    setPage,
    getPage,
  }
}
