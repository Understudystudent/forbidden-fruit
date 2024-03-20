import {
    createRouter,
    createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/AdminPage.vue'),
        // Check if the user is authenticated and is an admin
        beforeEnter: (to, from, next) => {
            console.log("User:", store.state.user); // Log the user object to verify its structure
            // Check if the user is authenticated and has the role of an admin
            if (store.state.user && store.state.user.result && store.state.user.result.userRole.toLowerCase() === 'admin') {
                console.log("User is authenticated as an admin."); // Log if user is authenticated as an admin
                // If authenticated and has the role of an admin, proceed to the '/admin' route
                next();
            } else {
                console.log("User is not authenticated or is not an admin."); // Log if user is not authenticated or is not an admin
                // If not authenticated or doesn't have the role of an admin, redirect to '/'
                next('/');
            }
        }
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
        path: '/products/:itemID',
        name: 'ItemDetailPage',
        component: () => import('../views/SingleProductPage.vue'),
        props: true
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
    {
        path: '/contactus',
        name: 'contact',
        component: () => import('../views/ContactPage.vue')
    },
    {
        path: '/adminadduser',
        name: 'AddUserFormAdmin',
        component: () => import('../components/UsersAdmin/AddUserAdmin.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/CartView.vue')
    },
    // {
    //     path: '/about',
    //     name: 'AboutPage',
    //     component: () => import('../views/AboutPage.vue')
    // },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router