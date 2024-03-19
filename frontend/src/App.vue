<template>
    <div>
        <NavBar v-show="loggedUser"/>
        <router-view />
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { useCookies } from 'vue3-cookies';
// Returns true
const { cookies } = useCookies()

export default {
    components: {
        NavBar,
    },
    data() {
        return {
            isUserLoggedIn: false,
        }
    },
    computed: {
        loggedUser() {
            return cookies?.get('LegitUser') ? true : false;
        },
        //  both conditions are met, it returns true
        userAuthenticated() {
            // !!null becomes false (&&) ensures that both conditions are true
            return this.$store.state.user !== null && this.$store.state.user.result !== null;
        },
    },
};
</script>


<style></style>