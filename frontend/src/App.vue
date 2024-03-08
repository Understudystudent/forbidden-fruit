<template>
  <div>
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'; 
// import axios from 'axios';

export default {
  name: 'App',
  components: {
    NavBar
  },
  
  // async created() {
  //   try {
  //     const response = await axios.get('users');
  //     this.$store.dispatch('users', response);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // }
}
</script>

<style>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 100%;
  transition: .5s;
  cursor: pointer;
}
</style>
