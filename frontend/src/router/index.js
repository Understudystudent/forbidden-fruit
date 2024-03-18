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
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: () => import( '../views/AdminDashboard.vue')
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
  {
    path: '/products/:itemID', 
    name: 'ItemDetailPage',
    component: () => import('../views/SingleProductPage.vue'),
    props: true 
  },
  {
    path: '/products',
    name: 'MultipleProducts',
    component: () => import( '../views/MultipleProducts.vue')
  },
  {
    path: '/editprofile',
    name: 'userEditPage',
    component: () => import( '../components/UserEditPage.vue')
  },
  {
    path: '/contactus',
    name: 'contact', 
    component: () => import( '../views/ContactPage.vue')
  },
  {
    path: '/adminadduser',
    name: 'AddUserFormAdmin',
    component: () => import( '../components/UsersAdmin/AddUserAdmin.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue') 
  }
 
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
