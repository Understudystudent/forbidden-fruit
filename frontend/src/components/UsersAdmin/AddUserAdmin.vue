<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center text-black display-2 font-italic cursive">Add User</h1>
    <form @submit.prevent="addUser" class="row">
      <!-- First Name -->
      <div class="form-group col-md-6">
        <label for="firstName" class="text-black">First Name:</label>
        <input v-model="userData.firstName" type="text" class="form-control" id="firstName" name="firstName" required>
      </div>
      <!-- Last Name -->
      <div class="form-group col-md-6">
        <label for="lastName" class="text-black">Last Name:</label>
        <input v-model="userData.lastName" type="text" class="form-control" id="lastName" name="lastName" required>
      </div>
      <!-- Age -->
      <div class="form-group col-md-6">
        <label for="userAge" class="text-black">Age:</label>
        <input v-model.number="userData.userAge" type="number" class="form-control" id="userAge" name="userAge" required>
      </div>
      <!-- Gender -->
      <div class="form-group col-md-6">
        <label for="Gender" class="text-black">Gender:</label>
        <select v-model="userData.Gender" class="form-control" id="Gender" name="Gender" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <!-- User Role -->
      <div class="form-group col-md-6">
        <label for="userRole" class="text-black">Role:</label>
        <select v-model="userData.userRole" class="form-control" id="userRole" name="userRole" required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <!-- Email Address -->
      <div class="form-group col-md-6">
        <label for="emailAdd" class="text-black">Email:</label>
        <input v-model="userData.emailAdd" type="email" class="form-control" id="emailAdd" name="emailAdd" required>
      </div>
      <!-- Profile -->
      <div class="form-group col-md-6">
        <label for="userProfile" class="text-black">Profile:</label>
        <input v-model="userData.userProfile" type="text" class="form-control" id="userProfile" name="userProfile" required>
      </div>
      <!-- Password -->
      <div class="form-group col-md-6">
        <label for="userPwd" class="text-black">Password:</label>
        <input v-model="userData.userPwd" type="password" class="form-control" id="userPwd" name="userPwd" required>
      </div>
      <!-- User Image Upload -->
      <div class="form-group col-md-6">
        <label for="userImg" class="text-black">Profile Image:</label>
        <input type="file" class="form-control-file" id="userImg" name="userImg" accept="image/*" @change="handleImageUpload">
        <img :src="imageUrl" alt="User Image" class="img-fluid mt-2">
        <p class="text-black">Image size cannot exceed 50kb.</p>
      </div>
      <!-- Buttons -->
      <div class="form-group col-md-12 d-flex justify-content-center">
        <button type="submit" class="btn btn-primary mx-5">Add User</button>
        <router-link to="/admin" class="btn btn-secondary ml-2">Go Back</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  name: 'AddUserFormAdmin',
  setup() {
    const imageUrl = ref('http://i.pravatar.cc/500?img=7');
    const userData = reactive({
      firstName: '',
      lastName: '',
      userAge: 18,
      Gender: 'Male',
      userRole: 'user',
      emailAdd: '',
      userProfile: '',
      userPwd: '',
      userImg: '' // Add userImg property
    });

    const handleImageUpload = async (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = async () => {
          const image = new Image();
          image.src = reader.result;
          image.onload = async () => {
            const canvas = document.createElement('canvas');
            const maxSize = 1024; // Define the maximum size in pixels
            let width = image.width;
            let height = image.height;

            // Resize the image if it exceeds the maximum dimensions
            if (width > maxSize || height > maxSize) {
              if (width > height) {
                height *= maxSize / width;
                width = maxSize;
              } else {
                width *= maxSize / height;
                height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, width, height);

            // Convert the canvas content to data URL
            const resizedDataURL = canvas.toDataURL('image/jpeg');

            // Set the resized image URL to imageUrl
            imageUrl.value = resizedDataURL;

            // Set the resized image data URL to userData.userProfile
            userData.userProfile = resizedDataURL;

            // Set the resized image data URL to userData.userImg
            userData.userImg = resizedDataURL;

            console.log('Image uploaded successfully.');
            console.log(resizedDataURL);
          };
        };

        reader.readAsDataURL(input.files[0]);
      }
    };

    const addUser = () => {
      console.log(userData);
    };

    return {
      handleImageUpload,
      imageUrl,
      userData,
      addUser
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  color: white;
  padding: 20px;
}

.form-group label {
  font-weight: bold;
}

.btn-primary {
  background-color: #7c3a7a;
  border-color: #7c3a7a;
  transition: background-color 0.3s; 
}

.btn-danger {
  background-color: #750000;
  border-color: #750000;
  transition: background-color 0.3s; 
}

.btn-primary:hover,
.btn-danger:hover {
  background-color: #ae5d9d; 
}

.cursive {
  font-family: cursive;
  font-size: 2.5rem;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .form-group {
    margin-bottom: 15px;
  }
}
</style>
