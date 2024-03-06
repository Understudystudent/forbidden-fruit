<template>
  <form @sumbit.prevent="handleSumbit">
    <div class="conatiner">
      <div class="row">
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
import axios from 'axios';

export default {
  name: 'loginPage',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {

    // Second way
    async handleSumbit() {
      try {
        const response = await axios.post('login',
          {
            email: this.email,
            password: this.password,
          });
        // Store our token
        localStorage.setItem('token', response.data.token);
        this.$router.push('./')
      } catch (e) {
        this.error = 'Invalid Username/Password'
      }

    }
  }
}


</script>

<style scoped></style>