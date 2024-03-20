import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminPage.vue'),
    // Check if the user is authenticated and is an admin
    beforeEnter: (to, from, next) => {
        // Retrieve user data from cookies
        const userData = cookies.get('userData');
        // Check if the userData object exists and has the userRole property
        if (userData && userData.result && userData.result.userRole) {
            // Extract the user role from the userData object
            const userRole = userData.result.userRole.toLowerCase();
            console.log("User role:", userRole); // Log the user role to verify
            if (userRole === 'admin') {
                console.log("User is authenticated as an admin."); // Log if user is authenticated as an admin
                next(); // Proceed to the '/admin' route
            } else {
                console.log("User is not an admin."); // Log if user is not an admin
                next('/'); // Redirect to '/'
            }
        } else {
            console.log("User data or role not found."); // Log if user data or role is not found
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
