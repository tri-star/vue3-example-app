import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from './pages/IndexPage.vue'

export const routerHistory = createWebHistory()


export const route = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: IndexPage
    },
  ]
})
