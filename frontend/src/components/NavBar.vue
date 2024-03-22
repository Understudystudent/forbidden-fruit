<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-midnight-black sticky-top container-fluid">
        <div class="container">
            <!-- Logo on the left -->
            <router-link to="/home" class="navbar-brand">
                <a href="https://ibb.co/Prbmr2j"><img
                        src="https://i.ibb.co/Prbmr2j/Screenshot-2024-03-09-8-29-56-PM-removebg-preview.png"
                        alt="Screenshot-2024-03-09-8-29-56-PM-removebg-preview" border="0"
                        style="max-width: 100px; max-height: 100px;"></a>
            </router-link>

            <!-- Navbar Toggle Button for small screens -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar Links in the middle -->
            <div class="collapse navbar-collapse flex-grow-1" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/products" class="nav-link">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contactus" class="nav-link">Contact</router-link>
                    </li>
                    <template v-if="userData && userData.result && userData.result.userRole === 'admin'">
                        <li class="nav-item">
                            <router-link to="/admin" class="nav-link">Admin</router-link>
                        </li>
                    </template>

                </ul>
            </div>

            <!-- Display User Name and Cart Icon -->
            <ul class="navbar-nav icons">
                <template v-if="userData && userData.result">
                    <li class="nav-item">
                        <!-- Check if user profile picture is available -->
                        <a v-if="userData.result.userProfile" class="nav-link">
                            <img :src="userData.result.userProfile" :alt="userData.result.firstName"
                                class="user-avatar" />
                        </a>
                        <!-- Check if user first name is available -->
                        <a v-else-if="userData.result.firstName" class="nav-link">
                            Hey, {{ userData.result.firstName }}
                        </a>
                    </li>
                </template>
                <!-- If not logged in -->
                <template v-else>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                </template>

                <!-- Cart Icon -->
                <li class="nav-item mx-1">
                    <router-link to="/cart" class="icon">
                        <span class="position-relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffd700"
                                class="bi bi-bag-heart" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" fill="#ffd700"
                                    d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                            </svg>
                        </span>
                    </router-link>
                </li>

                <!-- Dropdown Icon Account -->
                <li class="nav-item dropdown mx-1">
                    <a class="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffd700"
                            class="bi bi-person-gear" viewBox="0 0 16 16">
                            <path
                                d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                        </svg>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" @click="userEdit">Profile</a>
                        <a class="dropdown-item" @click="handleLogout">Logout</a>
                    </div>


                </li>

            </ul>
        </div>
    </nav>
</template>
<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: 'NavBar',
    setup() {
        const router = useRouter();
        const store = useStore();

        // Check for logout state in localStorage
        const logoutState = localStorage.getItem('logoutState');

        if (logoutState) {
            // Clear logout state
            localStorage.removeItem('logoutState');

            // Redirect to login page and refresh the page
            router.push({ name: 'loginPage' }).then(() => {
                location.reload();
            });
        }

        const userEdit = () => {
            router.push({ name: 'userEditPage' });
        };

        const handleLogout = () => {
            // Remove the userData cookie
            document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Clear user state in  store
            store.commit('setUser', null);

            // Set logout state in localStorage
            localStorage.setItem('logoutState', 'true');

            // Navigate to the login page
            router.push({ name: 'loginPage' }).then(() => {
                // Reload the page after redirecting to login page
                location.reload();
            });
        };

        // Get user data from  store
        const userData = store.state.userData;

        return { handleLogout, userEdit, userData };
    }
};
</script>

<style scoped>
.navbar {
    background-color: #000000;
}

.navbar-dark .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.nav-link {
    font-family: 'Parisienne', cursive; 
    color: #ffd700; 
}

.nav-link:hover {
    color: #dc143c; 
}


.dropdown-menu {
    background-color: #000000;
}

.dropdown-item {
    font-family: 'Parisienne', cursive; 
    color: #ffd700;
}

.dropdown-item:hover {
    background-color: #800080;
    color: #ffd700;
}



.icons .nav-link .bi {
    font-size: 1.2rem;
}

.text-golden-lust {
    color: #ffd700;
}

.icons {
    display: flex;
    align-items: center;
}
</style>
