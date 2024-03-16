<template>
    <div class="contact-page">
      <!-- Contact form -->
      <form @submit.prevent="submitForm" action="https://formspree.io/f/xpzgnpee" method="POST" class="contact-form">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" name="email" required>
        <label for="message">Message:</label>
        <textarea id="message" v-model="formData.message" name="message" required></textarea>
        <button type="submit">Submit</button>
        <!-- Error message -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'ContactPage',
    setup() {
      // Form data
      const formData = ref({
        name: '',
        email: '',
        message: ''
      });
  
      // Error message
      const errorMessage = ref('');
  
      // Method to submit form
      const submitForm = () => {
        // Validate form fields
        if (!formData.value.name || !formData.value.email || !formData.value.message) {
          errorMessage.value = 'Please fill out all fields.';
          return;
        }
  
        // Send form data to backend (Form Spree)
        fetch('https://formspree.io/f/xpzgnpee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData.value)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to submit form.');
          }
          // Reset form data
          formData.value = {
            name: '',
            email: '',
            message: ''
          };
          // Show success message or redirect user
          alert('Form submitted successfully!');
        })
        .catch(error => {
          errorMessage.value = 'Failed to submit form. Please try again later.';
          console.error(error);
        });
      };
  
      return { formData, errorMessage, submitForm };
    }
  }
  </script>
  
  <style scoped>
  /* Styles for the contact form */
  .contact-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh; /* Adjust the height as needed */
  }
  
  .contact-form {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    background-color: #000000; /* Midnight Black */
    border-radius: 10px;
  }
  
  .contact-form label {
    color: #ffd700; /* Golden Lust */
    margin-bottom: 8px;
  }
  
  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
    background-color: #5c3317; /* Dark Chocolate */
    color: #ffffff; /* White */
  }
  
  .contact-form button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #8b0000; /* Devilish Red */
    color: #ffffff; /* White */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .contact-form button:hover {
    background-color: #dc143c; /* Sultry Crimson */
  }
  
  .error-message {
    color: #ff0000; /* Red */
    margin-top: 10px;
  }
  </style>
  