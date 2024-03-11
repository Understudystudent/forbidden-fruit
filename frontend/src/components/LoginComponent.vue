<template>
    <form @submit.prevent="handleSumbit">
      <div class="container mt-5">
        <div class="row mt-5">
          <div class="col-12 justify-content-center d-flex flex-row pt-5">
            <div id="signin" class="flext-item border">
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <h2 class="pt-4">Welcome</h2>
  
              <!-- form -->
              <div class="form-group pt-4 pl-4 pr-4">
                <div class="form-group">
                  <label>Email </label>
                  <input v-model="email" type="email" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Password </label>
                  <input v-model="password" type="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary mt-2 py-0">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </template>
  
  <script>
//   import applyToken from '../Service/AuthenticateUser.js';
  
  export default {
    name: 'loginPage',
    data() {
      return {
        email: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async handleSumbit() {
        try {
          const { msg, token, } = await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
  
          if (token) {
            // Apply token
            // applyToken(token);
  
            // Store your user data as needed
            localStorage.setItem('authToken', token);
  
            // Home page
            this.$router.push('/');
          } else {
            this.error = msg;
          }
        } catch (e) {
          // Handle error
          this.error = 'Failed to login.';
          console.error('Error during login:', e);
        }
      },
    },
  };
  </script>
  
  <style scoped></style>
  