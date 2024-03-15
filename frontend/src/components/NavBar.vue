    <template>
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div class="container">
                <!-- Logo on the left -->
                <router-link to="/" class="nav-link">
                    <img src="@/assets/logo.png" alt="" />
                </router-link>

                <!-- Navbar Toggle Button for small screens -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navbar Links in the middle -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/products">products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Accessories</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin">Admin</a>
                        </li>
                        <!-- Display User Name -->
                        <div v-if="user" class="nav-item">
                            <a class="nav-link" v-if="user.userProfile">
                                <img :src="user.userProfile" :alt="user.firstName" class="user-avatar" />
                            </a>
                            <a class="nav-link" v-else-if="user.firstName">
                                Hey, {{ user.firstName }}
                            </a>
                        </div>

                        <!-- If not logged in -->
                        <div v-else class="nav-item">
                            <a class="nav-link" href="/login">Login</a>
                        </div>
                    </ul>
                </div>

                <!-- Navbar Icons on the right -->
                <div class="icons">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </span>
                    <!-- Dropdown Icon Acount -->
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" @click="userEdit">Profile</a>
                            <a class="dropdown-item" @click="handleLogout">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </template>

  <script>
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',

  setup() {
    const router = useRouter();

    const handleLogout = () => {
      // Handle logout logic
    };

    const userEdit = () => {
      router.push({ name: 'userEditPage' });
    };

    const search = () => {
      // Handle search logic
    };

    const getUserFromToken = () => {
      // Get user data from token
    };

    return { handleLogout, userEdit, search, getUserFromToken };
  },
};
</script>



    <style scoped>
    nav {
        border-bottom: 2px solid #f8f8f8;
    }

    .navbar-brand img {
        max-height: 45px;
    }

    .nav-item {
        margin-right: 16px;
    }

    .icons {
        display: flex;
        align-items: center;
    }

    .icon {
        margin: 0 13px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
