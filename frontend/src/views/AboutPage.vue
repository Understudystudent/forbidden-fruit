<template>
    <div class="about-us">
      <div class="background-image">
        <div class="content-box">
          <h1>Welcome to Forbidden Bliss</h1>
          <p>At Forbidden Bliss, we invite you to surrender to the allure of artistic temptation. Our enigmatic vision revolves around igniting desires through the medium of art. Step into our world and discover the tantalizing journey that awaits.</p>
        </div>
      </div>
      <VisionPage/>
      <GuardiansSection/>

    </div>
  </template>
  
  <script>
  import VisionPage from '@/components/VisionPage.vue';
  import GuardiansSection from '@/components/GuardiansSection.vue';

  
  export default {
    components: {
      VisionPage,
      GuardiansSection
    }
  };
  </script>
  
  <style scoped>

body {
    font-family: 'Arial', sans-serif; 
    
  }
  .about-us {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
  }
  
  .background-image {
    width: 100%;
    height: 100vh; 
    background-image: url('https://i.ibb.co/tbDYCPT/GFXGe-Ki-Wk-AAK4-q.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content-box {
    background-color: rgba(19, 17, 17, 0.7); 
    padding: 20px;
    border-radius: 10px;
    color: #fff; 
    text-align: center;
  }
  
  .content-box h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .content-box p {
    font-size: 18px;
    line-height: 1.6;
  }
  
  .content {
    max-width: 800px;
    padding: 20px;
    /* color: #8f1e16; */
    color: #810707;
  }
  </style>
  