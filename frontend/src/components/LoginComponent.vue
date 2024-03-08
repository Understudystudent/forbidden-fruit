<template>
  <form @sumbit.prevent="handleSumbit">
    <div class="conatiner mt-5">
      <div class="row mt-5">
        <div class="col-12 justify-content-center d-flex flex-row pt-5">
          <div id="signin" class="flext-item border">
            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            <h2 class="pt-4">Welcome</h2>

            <!-- form -->
            <form @submit="signin" class="form-group pt-4 pl-4 pr-4">
              <div class="form-group">
                <label>Email </label>
                <input v-model="email" type="email" class="form-control" />
              </div>
              <div class="form-group">
                <label>Password </label>
                <input v-model="password" type="password" class="form-control" />
              </div>
              <button class="btn btn-primary mt-2 py-0">Login</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </form>
</template>


<script>
import  applyToken from '../Service/AuthenticateUser.js'

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
        const response = await this.login({
          email: this.email,
          password: this.password,
        });

        // Apply  token 
        applyToken(response.data.token);

        // Store your user data as needed
        localStorage.setItem('authToken', response.data.token);

        // home  page
        this.$router.push('/');
      } catch (e) {
        // Handle error
        this.error = 'Invalid Username/Password';
        console.error(e);
      }
    },
  },
};
</script>

<style scoped></style>