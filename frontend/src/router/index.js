import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import( '../views/AdminPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../components/RegisterComponet.vue')
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import( '../components/LoginComponent.vue')
  },
  {
    path: '/forgot',
    name: 'forgotPage',
    component: () => import( '../components/ForgotComponet.vue')
  },
  {
    path: '/reset/:token',
    name: 'ResetPassword',
    component: () => import( '../components/ResetPassword.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
