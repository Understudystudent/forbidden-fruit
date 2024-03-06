<template>
    <div class="reset-password-container">
      <div class="reset-password-content">
        <h2 class="reset-password-title">Reset Password</h2>
        <p class="reset-password-subtitle">Enter your new password below.</p>
  
        <!-- Form for password reset -->
        <form @sumbit.prevent="handleSubmit">
            
          <div class="form-group">
            <label for="password" class="form-label">New Password</label>
            <input type="password" id="password" v-model="newPassword" class="form-input" required>
          </div>
  
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-input" required>
          </div>
  
          <button type="submit" class="reset-password-button">Reset Password</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    name: "ResetPassword",
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
      };
    },
    methods: {

        
        async handleSubmit(){
            
            const response = await axios.post ('reset',{
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword,
                token: this.$route.params.token
            }); 
            console.log(response);
            this.$route.push('/login')
        } 
    }
  };
  </script>
  
  <style scoped>
  .reset-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .reset-password-content {
    max-width: 400px;
    text-align: center;
    padding: 20px;
    background-color: #fff; 
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }
  
  .reset-password-title {
    color: #333; 
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .reset-password-subtitle {
    color: #555; 
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    color: #333; 
    margin-bottom: 5px;
  }
  
  .form-input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .reset-password-button {
    background-color: #007bff; 
    color: #fff; 
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .reset-password-button:hover {
    background-color: #0056b3; 
  }
  </style>
  