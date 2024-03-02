<template>
  <div>
    
    <NavBar/>
    <router-view/>
    <!-- <FooterView/> -->
    </div>
</template>


<script>
import NavBar from './components/NavBar.vue'; 

// import FooterView from './components/FooterView.vue';

export default {
  components: {
    // FooterView, 
    NavBar
  }
}
 
</script>



<style >

</style>
