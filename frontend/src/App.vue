<template>
  <div>
    
    <NavBar />
    <router-view/>
   </div>
</template>


<script>
import NavBar from './components/NavBar.vue'; 
import axios from 'axios';

// import FooterView from './components/FooterView.vue';

export default {
  name: 'App',
  components: {
    // FooterView, 
    NavBar
  },
  
    async created(){
    const response = await axios.get('users');
    
    this.$store.dispatch('users',response)

}
}
 
</script>


<!-- Css -->
<style >
.btn {
  display:flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width:100%;
  transition:.5s;
  cursor: pointer;
 
}


</style>
