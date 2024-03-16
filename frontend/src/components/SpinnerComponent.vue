<!-- Spinner.vue -->
<template>
    <div class="spinner-container" v-if="loading">
      <div class="spinner">
        <img src="../assets/Screenshot-2024-03-09-8-29-56-PM-removebg-preview.png" alt="Center Image" class="center-image" loading="lazy"/>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Spinner',
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .spinner {
    position: relative;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  .center-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  