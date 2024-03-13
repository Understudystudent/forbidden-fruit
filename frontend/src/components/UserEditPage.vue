<template>
    <div class="container mt-5">
      <h2 class="mb-4 text-center">Edit Your Account</h2>
      <form @submit.prevent="updateUser" class="row">
        <!-- User Image -->
        <div class="col-md-4 mb-3">
          <label for="userImage">Profile Image:</label>
          <input type="file" class="form-control-file" id="userImage" name="userImage" accept="image/*">
          <img v-if="formData.userProfile" :src="formData.userProfile" alt="User Image" class="img-fluid mt-2">
        </div>
        <div class="col-md-8">
          <!-- First Name -->
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input v-model="formData.firstName" type="text" class="form-control" id="firstName" name="firstName">
          </div>
          <!-- Last Name -->
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input v-model="formData.lastName" type="text" class="form-control" id="lastName" name="lastName">
          </div>
          <!-- Age -->
          <div class="form-group">
            <label for="userAge">Age:</label>
            <input v-model.number="formData.userAge" type="number" class="form-control" id="userAge" name="userAge">
          </div>
          <!-- Gender -->
          <div class="form-group">
            <label for="gender">Gender:</label>
            <select v-model="formData.gender" class="form-control" id="gender" name="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <!-- Phone Number -->
          <div class="form-group">
            <label for="phoneNumber">Phone Number:</label>
            <input v-model="formData.phoneNumber" type="number" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="e.g., +123456789">
          </div>
          <!-- Address -->
          <div class="form-group">
            <label for="address">Address:</label>
            <textarea v-model="formData.address" class="form-control" id="address" name="address" rows="3"></textarea>
          </div>
          <!-- Add other fields as needed -->
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Update Details</button>
            <button type="button" class="btn btn-danger" @click="deleteAccount">Delete Account</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import store from '@/store/index'; // Import the Vuex store
  
  export default {
    setup() {
      const formData = ref({
        firstName: '',
        lastName: '',
        userAge: 18,
        gender: 'Male',
        userProfile: '', // change to text?
        phoneNumber: '',
        address: '',
      });
  
      const updateUser = async () => {
  try {
    // No userID?
    const userId = store.state.auth.userId; 
    // Construct the payload with the user ID and other data if needed
    const payload = {
      id: userId,
    };

    const { msg } = await store.dispatch('updateUser', payload);

    if (msg) {
      console.log('Update successful:', msg);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

  
      return {
        formData,
        updateUser,
      };
    },
  };
  </script>
  
  
 <style scoped>

  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-group label {
    font-weight: bold;
  }
  
  .btn-primary {
    background-color: #4CAF50;
    border-color: #4CAF50;
  }
  
  .btn-danger {
    background-color: #F44336;
    border-color: #F44336;
  }
  </style>
  