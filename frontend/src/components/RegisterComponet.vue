<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-3">
        <p>Add logo</p>
      </div>
    </div>

    <!-- Header -->

    <div class="row ">
      <div class="col-12 justify-content-center d-flex pt-3">
        <div id="signup" class="flex-item border ">
          <h2 class="pt-4 pl-4">Create Account</h2>
          <form @submit.prevent="handleSubmit" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label for="Email">Email</label>
              <input type="email" v-model="userData.emailAdd" class="form-control" required />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label> First Name</label>
                  <input type="text" v-model="userData.firstName" class="form-control" required />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label> Last Name</label>
                  <input type="text" v-model="userData.lastName" class="form-control" required />
                </div>
              </div>
            </div>


            <!-- Additional Fields -->
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label for="userAge">User Age</label>
                  <input type="number" v-model="userData.userAge" class="form-control" required />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="Gender">Gender</label>
                  <select v-model="userData.Gender" class="form-control" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="userProfile">User Profile</label>
              <textarea v-model="userData.userProfile" class="form-control" required></textarea>
            </div>

            <!-- change this to make the user add a Url -->
            <div class="form-group">
              <label for="userImg">Image URL</label>
              <input type="text" v-model="userData.userImgUrl" @input="handleImageUrlChange" class="form-control" />

            </div>
            <div class="form-group">
              <label for="number">Number</label>
              <input type="number" v-model="userData.number" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" v-model="userData.address" class="form-control" required />
            </div>

            <!-- Password Fields -->
            <div class="form-group">
              <label for="Password"> Password</label>
              <input type="password" v-model="userData.userPwd" class="form-control" required />
            </div>


            <!-- <div class="form-group">
              <label for="Password"> Confirm password</label>
              <input type="password" v-model="password_confirm" class="form-control" required />
            </div> -->

            <button class="btn btn-primary mt-2">Create Account</button>

            <p class="forgot-password text-right">
              <router-link to="forgot">Forgot password?</router-link>
            </p>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RegisterPage',
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        userAge: 18,
        Gender: '',
        emailAdd: '',
        userProfile: '',
        userPwd: '',
        address: '',
        number: null,
        userImgUrl: '',
      }
    };
  },
  methods: {
    async handleSubmit() {
      // const data = {
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   userAge: this.userAge,
      //   Gender: this.Gender,
      //   emailAdd: this.emailAdd,
      //   userProfile: this.userProfile,
      //   userPwd: this.userPwd,
      //   password_confirm: this.password_confirm,
      //   userImgUrl: this.userImgUrl,
      // };

      try {
        await this.$store.dispatch('register', this.userData);
        console.log('Registration successful:', this.userData);
        // this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        console.log(this.userData);
      }
    }
  }
};


</script>

<style scoped></style>
