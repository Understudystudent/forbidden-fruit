<template>
    <div class="about-us">
      <div class="background-image">
        <div class="content-box">
          <h1>Welcome to Forbidden Bliss</h1>
          <p>At Forbidden Bliss, we invite you to surrender to the allure of artistic temptation. Our enigmatic vision revolves around igniting desires through the medium of art. Step into our world and discover the tantalizing journey that awaits.</p>
        </div>
      </div>
    
      <div class="content">
        <h2>Our Enigmatic Vision</h2>
        <p>Forbidden Bliss isn't just a gallery; it's a sanctuary for those who seek to explore the depths of their desires. We believe that art has the power to evoke emotions, stir passions, and awaken the senses. Our mission is to curate a collection that captivates, intrigues, and seduces.</p>
      
        <h2>The Guardians</h2>
        <p>Behind the veil of Forbidden Bliss are the Guardians, a team of passionate individuals dedicated to curating the finest selection of art. With a keen eye for beauty and a taste for the forbidden, our Guardians carefully select each piece to ensure it resonates with our audience.</p>
    
        <h2>Contact Us</h2>
        <p>Ready to embark on a journey of forbidden pleasures? Reach out to us to learn more about our collection, membership options, or upcoming events.</p>
        <p><strong>Forbidden Bliss Headquarters:</strong><br>
        Address Line 1,<br>
        Address Line 2,<br>
        City, State, ZIP Code</p>
        <p><strong>Phone:</strong> 1-800-Bliss-ART<br>
        <strong>Email:</strong> info@forbiddenBliss.com</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    setup() {
      // You can add any setup logic here if needed
    }
  };
  </script>
  
  <style scoped>
  .about-us {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* To stack the content vertically */
  }
  
  .background-image {
    width: 100%;
    height: 200vh; /* Twice as big */
    background-image: url('https://i.ibb.co/tbDYCPT/GFXGe-Ki-Wk-AAK4-q.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .content-box {
    background-color: rgba(0, 0, 0, 0.5); 
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
  }
  </style>
  