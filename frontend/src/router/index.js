import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// import store from '../store'; // Import your Vuex store

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminPage.vue'),
    // beforeEnter: (to, from, next) => {
    //   Check if the user is authenticated and is an admin
    //   if (!store.state.userAuthenticated || store.state.userRole.toLowerCase() !== 'admin') {
    //     next('/');
    //   } else {
    //     next();
    //   }
    // }
  },
  {
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/RegisterComponet.vue')
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('../components/LoginComponent.vue')
  },
  {
    path: '/forgot',
    name: 'forgotPage',
    component: () => import('../components/ForgotComponet.vue')
  },
  {
    path: '/reset/:token',
    name: 'ResetPassword',
    component: () => import('../components/ResetPassword.vue')
  },
  {
    path: '/product',
    name: 'SingleProduct',
    component: () => import('../views/SingleProductPage.vue')
  },
  {
    path: '/products',
    name: 'MultipleProducts',
    component: () => import('../views/MultipleProducts.vue')
  },
  {
    path: '/editprofile',
    name: 'userEditPage',
    component: () => import('../components/UserEditPage.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
