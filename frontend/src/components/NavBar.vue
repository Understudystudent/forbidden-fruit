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
            <!-- <li class="nav-item">
              <router-link to="/accessories" class="nav-link">Accessories</router-link>
            </li> -->
            <!-- y -->
            <li class="nav-item">
              <router-link to="/contactus" class="nav-link">Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">Admin</router-link>
            </li>
  
            <!-- Display User Name -->
            <template v-if="user">
              <li class="nav-item">
                <a class="nav-link" v-if="user.userProfile">
                  <img :src="user.userProfile" :alt="user.firstName" class="user-avatar" />
                </a>
                <a class="nav-link" v-else-if="user.firstName">
                  Hey, {{ user.firstName }}
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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
      <!-- Display number of items in the cart -->
      <span class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">{{ cartItemsCount }}</span>
    </span>
  </router-link>
  <!-- Dropdown Icon Account -->
  <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
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
  
      const handleLogout = () => { 
        // Remove the cookie by setting its expiration date to a past time
        document.cookie = "userAuthenticated=; expires=Thu, 25 March 1999 00:00:00 UTC; path=/;";

        // Clear user state in Vuex store
        store.commit('setUser', null);

        router.push({ name: 'loginPage' });
      };
  
      const userEdit = () => {
        router.push({ name: 'userEditPage' });
      };
  
      return { handleLogout, userEdit };
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
  