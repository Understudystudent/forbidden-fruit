<template>
    <div class="forgot-container">
      <div class="forgot-content">
        <h2 class="forgot-title">Forgot Password</h2>
        <p class="forgot-subtitle">Enter your email address to reset your password.</p>
  
        <!-- Form for password reset -->
        <form @sumbit.prevent="handleSubmit"> 
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input type="email" id="email" v-model="email" class="form-input" required>
          </div>
  
          <button type="submit" class="forgot-button">Reset Password</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios'

  export default {
   name: 'ForgotPage',
   data() {
    return {
        email: '',
    }
   },
   methods: {
    async handleSubmit(){
        const response = await axios.post ('forgot',{
            email: this.email
        }); 
        console.log(response);

    }
   }
    }

  </script>
  
  <style scoped>
  .forgot-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
  }
  
  .forgot-content {
    max-width: 400px;
    text-align: center;
    padding: 20px;
    background-color: #ffd700; 
    border-radius: 8px;
  }
  
  .forgot-title {
    color: #000;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .forgot-subtitle {
    color: #333;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    color: #000;
    margin-bottom: 5px;
  }
  
  .form-input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #000;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .forgot-button {
    background-color: #000;
    color: #ffd700; 
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .forgot-button:hover {
    background-color: #333;
  }
  </style>
  