import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'; 
import HomeView from "../views/HomeView.vue";
import AdminPage from "../views/AdminPage.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    // Check if the user is authenticated and is an admin
    beforeEnter: async (to, from, next) => {
      try {
        // Fetch user data from cookie
        await store.dispatch('fetchUserDataFromCookie');
        // Log the fetched userData
        console.log('Fetched userData:', store.state.userData);
        // Proceed if user is authenticated as an admin
        const userData = store.state.userData;
        if (userData && userData.result && userData.result.userRole === 'admin') {
          next(); // Proceed to the '/admin' route
        } else {
          next('/'); // Redirect to '/'
        }
      } catch (error) {
        console.error('Error:', error);
        next('/'); // Redirect to '/'
      }
    }
  },
  {
    path: "/adminDashboard",
    name: "AdminDashboard",
    component: () => import("../views/AdminDashboard.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/RegisterComponet.vue"),
  },
  {
    path: "/login",
    name: "loginPage",
    component: () => import("../components/LoginComponent.vue"),
  },
  {
    path: "/forgot",
    name: "forgotPage",
    component: () => import("../components/ForgotComponet.vue"),
  },
  {
    path: "/reset/:token",
    name: "ResetPassword",
    component: () => import("../components/ResetPassword.vue"),
  },
  {
    path: "/products/:itemID",
    name: "ItemDetailPage",
    component: () => import("../views/SingleProductPage.vue"),
    props: true,
  },
  {
    path: "/products",
    name: "MultipleProducts",
    component: () => import("../views/MultipleProducts.vue"),
  },
  {
    path: "/editprofile",
    name: "userEditPage",
    component: () => import("../components/UserEditPage.vue"),
  },
  {
    path: "/contactus",
    name: "contact",
    component: () => import("../views/ContactPage.vue"),
  },
  {
    path: "/adminadduser",
    name: "AddUserFormAdmin",
    component: () => import("../components/UsersAdmin/AddUserAdmin.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/about",
    name: "AboutPage",
    component: () => import("../views/AboutPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
