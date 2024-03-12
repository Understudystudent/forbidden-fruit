<template>
    <div>
        <NavBar v-if="userAuthenticated"></NavBar>
        <router-view />
    </div>
</template>

  
<script>
    import NavBar from './components/NavBar.vue';

    export default {
        computed: {
            userAuthenticated() {
                return this.$store.state.user !== null && this.$store.state.user.result !== null;
            },
        },
        components: {
            NavBar,
        },
    };
</script>

  
  <style>
  </style>
  