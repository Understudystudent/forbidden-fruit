<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <!-- Logo on the left -->
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/logo.png" alt="" />
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

          <!-- Display Admin link if the user is logged in as an admin -->
          <template v-if="userData && userData.result && userData.result.userRole === 'admin'">
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">Admin</router-link>
            </li>
          </template>

          <!-- Display User Name -->
          <template v-if="userData && userData.result">
            <li class="nav-item">
              <!-- Check if user profile picture is available -->
              <a v-if="userData.result.userProfile" class="nav-link">
                <img :src="userData.result.userProfile" :alt="userData.result.firstName" class="user-avatar" />
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
        </ul>
      </div>

      <!-- Navbar Icons on the right -->
      <div class="icons">
        <!-- Cart Icon -->
        <router-link to="/cart" class="icon">
          <span class="position-relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart"
              viewBox="0 0 16 16">
              <!-- Your cart SVG -->
            </svg>
          </span>
        </router-link>
        <!-- Dropdown Icon Account -->
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-person-circle" viewBox="0 0 16 16">
              <!-- Your person circle SVG -->
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
