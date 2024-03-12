<template>
      <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <form @submit.prevent="updateUser">
        <label for="userID">User ID:</label>
        <input v-model="payload.userID" type="text" id="userID" disabled />
  
        <label for="firstName">First Name:</label>
        <input v-model="payload.firstName" type="text" id="firstName" />
  
        <label for="lastName">Last Name:</label>
        <input v-model="payload.lastName" type="text" id="lastName" />
  
        <label for="userAge">User Age:</label>
        <input v-model="payload.userAge" type="text" id="userAge" />
  
        <label for="gender">Gender:</label>
        <input v-model="payload.Gender" type="text" id="gender" />
  
        <label for="userRole">User Role:</label>
        <input v-model="payload.userRole" type="text" id="userRole" />
  
        <label for="emailAdd">Email Address:</label>
        <input v-model="payload.emailAdd" type="text" id="emailAdd" />
  
        <label for="userProfile">User Profile:</label>
        <input v-model="payload.userProfile" type="text" id="userProfile" />
  
        <button type="submit">Update</button>
      </form>

      </div>
  </template>
  
 
<script>
export default {
  props: ['editUserAdmin', 'user'],
  data() {
    return {
      editingUser: null, 
      showEditUserModal: false, 
      payload: {
        userID: '',
        firstName: '',
        lastName: '',
        userAge: '',
        Gender: '',
        userRole: '',
        emailAdd: '',
        userProfile: '',
        userPwd: '',
        number: '',
      }
    };
  },
  methods: {
    updateFormData() {
      this.payload = { ...this.user };
    },
    updateUser() {
      this.$store.dispatch('updateUser', this.payload);
      this.$emit('update', this.payload);
    }
  },
  mounted() {
    this.updateFormData();
  }
};
</script>
  
  <style scoped>
  </style>