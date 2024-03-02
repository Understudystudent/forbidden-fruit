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


<!-- Css -->
<style >
/* .btn {
  display:flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width:100%;
  transition:.5s;
  cursor: pointer;
 
} */


</style>
