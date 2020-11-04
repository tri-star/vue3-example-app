import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from './pages/user/IndexPage.vue'
import LoginPage from './pages/login/LoginPage.vue'
import UserFormPage from './pages/user/UserFormPage.vue'
import UserEditFormPage from './pages/user/UserEditFormPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

const routerHistory = createWebHistory()

export const route = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/user',
    },
    {
      path: '/user',
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
    {
      path: '/user/:id/edit',
      name: 'user-edit',
      component: UserEditFormPage,
    },
    {
      path: '/error/not-found',
      name: 'notfound',
      component: NotFoundPage,
    },
  ],
})
