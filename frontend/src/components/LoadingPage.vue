<template>

    <!-- animation page -->
    <div>
        <p v-if="user">Welcome {{ user.firstName }} {{ user.lastName }}</p>
        <p v-if ="!user">You are not logged in!</p>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: "loadingPage",
    computed:{
        ...mapGetters(['user'])
    }

}
</script>

<style ></style>