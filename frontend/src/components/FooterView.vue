<template>
    <footer class="footer">
      <div class="footer-left">
        <h2 class="forbidden-logo">Forbidden</h2>
        <p class="tagline">Unveil Your Desires</p>
      </div>
      <div class="footer-middle">
        <ul class="social-links">
            <i class="bi bi-twitter"></i>
            <i class="bi bi-facebook"></i>
            <i class="bi bi-pinterest"></i>
            <i class="bi bi-tiktok"></i>
            <i class="bi bi-instagram"></i>
        </ul>
      </div>
      <div class="copyright">
        <p>&copy; {{ currentYear }} Forbidden. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterPage",
    data() {
      return {
        footerItems: [
          { label: 'Shop All', url: '#' },
          { label: 'NFTs', url: '#' },
          { label: 'Art', url: '#' },
          { label: 'Lust', url: '#' },
          { label: 'Sculptures', url: '#' }
        ],
      };
    },
    computed: {
      currentYear() {
        return new Date().getFullYear();
      }
    }
  };
  </script>
  
  <style>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    color: #ffffff;
    padding: 20px;
    position: relative;
  }
  
  .forbidden-logo {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #ffffff;
  }
  
  .tagline {
    font-size: 14px;
  }
  
  .footer-nav {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-link {
    color: #ffffff;
    text-decoration: none;
    margin-right: 20px;
    font-size: 16px;
  }
  
  .footer-link:hover {
    text-decoration: underline;
  }
  
  .social-links {
    list-style-type: none;
    padding: 0;
  }
  .social-links i {
      color: white;
    }
  
  .social-link {
    color: #ffffff;
    text-decoration: none;
    margin-right: 10px;
    font-size: 20px;
  }
  
  .social-link i {
    color: #ffffff; /* Set icon color to white */
  }
  
  .copyright {
    font-size: 10px;
    text-align: right;
    position: absolute;
    bottom: 5px;
    right: 20px;
  }
  </style>
  