import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from './pages/index/IndexPage.vue'
import UserFormPage from './pages/index/UserFormPage.vue'

export const routerHistory = createWebHistory()

export const route = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
    },
    {
      path: '/user/register',
      name: 'user-register',
      component: UserFormPage,
    },
  ],
})
