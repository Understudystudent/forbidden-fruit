<template>
    <div class="bg-black">
        <!-- <NavBar/> -->
        <NavBar v-show="loggedUser"/>
        <router-view />
        <FooterPage v-show="loggedUser"/>
    </div>
</template>

<script>
import FooterPage from './components/FooterView.vue';
import NavBar from './components/NavBar.vue';
import { useCookies } from 'vue3-cookies';
// Returns true
const { cookies } = useCookies()

export default {
    components: {
        NavBar,
        FooterPage,
    },
    data() {
        return {
            isUserLoggedIn: false,
        }
    },
    computed: {
        loggedUser() {
            return cookies?.get('userData') ? true : false;
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