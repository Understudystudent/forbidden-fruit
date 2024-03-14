<template>
    <div class="container mt-5">
        <h2 class="mb-4 text-center">Edit Your Account</h2>
        <form @submit.prevent="updateUser" class="row">
            <!-- User Image -->
            <div class="col-md-4 mb-3">
                <label for="userImage">Profile Image: Image size cannot exceeds 50kb.
                </label>
                <input type="file" class="form-control-file" id="userImage" name="userImage" accept="image/*"
                    @change="handleImageUpload">
                <img :src="imageUrl" alt="User Image" class="img-fluid mt-2">

            </div>
            <div class="col-md-8">
                <!-- First Name -->
                <div class="form-group">
                    <label for="firstName">First Name:</label>
                    <input v-model="formData.firstName" type="text" class="form-control" id="firstName"
                        name="firstName">
                </div>
                <!-- Last Name -->
                <div class="form-group">
                    <label for="lastName">Last Name:</label>
                    <input v-model="formData.lastName" type="text" class="form-control" id="lastName" name="lastName">
                </div>
                <!-- Age -->
                <div class="form-group">
                    <label for="userAge">Age:</label>
                    <input v-model.number="formData.userAge" type="number" class="form-control" id="userAge"
                        name="userAge">
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
                    <input v-model="formData.phoneNumber" type="number" class="form-control" id="phoneNumber"
                        name="phoneNumber" placeholder="e.g., +123456789">
                </div>
                <!-- Address -->
                <div class="form-group">
                    <label for="address">Address:</label>
                    <textarea v-model="formData.address" class="form-control" id="address" name="address"
                        rows="3"></textarea>
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

        const imageUrl = ref('http://i.pravatar.cc/500?img=7');

        const updateUser = async () => {
            try {
                const userId = store.state.auth.userId;
                const payload = {
                    id: userId,
                    // Include other data from formData if needed
                };

                const { msg } = await store.dispatch('updateUser', payload);

                if (msg) {
                    console.log('Update successful:', msg);
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        };

        const handleImageUpload = async (e) => {
            const i = e.target;
            if (i.files && i.files[0]) {
                const r = new FileReader();
                r.onload = async () => {
                    const img = new Image();
                    img.src = r.result;
                    img.onload = async () => {
                        const c = document.createElement('canvas');
                        const m = 1024;
                        let [w, h] = [img.width, img.height];
                        if (w > m || h > m) {
                            const r = w > h ? m / w : m / h;
                            [w, h] = [w * r, h * r];
                        }
                        c.width = w;
                        c.height = h;
                        const ctx = c.getContext('2d');

                        // Crop image from the bottom
                        const cropAmount = 100; // Adjust this value to change the amount to be cropped
                        ctx.drawImage(img, 0, 0, w, h - cropAmount, 0, 0, w, h - cropAmount);

                        const d = c.toDataURL('image/jpeg', 0.8); // Adjust quality (0.5 for example) to reduce size
                        if (d.length <= 62000) { // Ensure the image string is less than 60kb
                            imageUrl.value = formData.value.userProfile = d;
                            store.dispatch('updateUserImage', d);
                            console.log('Image uploaded successfully.', d);
                        } else {
                            console.log('Image size exceeds 62kb.');
                        }
                    };
                };
                r.readAsDataURL(i.files[0]);
            }
        };





        return {
            formData,
            updateUser,
            handleImageUpload,
            imageUrl,
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