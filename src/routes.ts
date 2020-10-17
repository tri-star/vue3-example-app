import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from './pages/index/IndexPage.vue'
import LoginPage from './pages/login/LoginPage.vue'
import UserFormPage from './pages/index/UserFormPage.vue'

const routerHistory = createWebHistory()

export const route = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        layout: 'LoginLayout',
        allowGuest: true,
      },
    },
    {
      path: '/user/register',
      name: 'user-register',
      component: UserFormPage,
    },
  ],
})
