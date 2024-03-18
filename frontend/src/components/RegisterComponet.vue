<template>
  <div class="box">
    <form class="signup signup-container" @submit.prevent="handleSubmit" autocomplete="on">
      <h1>Create account</h1>
      <h2>Already have an account? <span @click="redirectToLoginPage">Login</span></h2>

      <div class="signup__field">
        <input v-model="userData.firstName" class="signup__input" type="text" name="firstName" id="firstName" required />
        <label class="signup__label" for="firstName">First Name</label>
      </div>

      <div class="signup__field">
        <input v-model="userData.lastName" class="signup__input" type="text" name="lastName" id="lastName" required />
        <label class="signup__label" for="lastName">Last Name</label>
      </div>

      <div class="signup__field">
        <input v-model="userData.emailAdd" class="signup__input" type="text" name="emailAdd" id="emailAdd" required />
        <label class="signup__label" for="emailAdd">Email</label>
      </div>

      <div class="signup__field">
        <input v-model="userData.userPwd" class="signup__input" type="password" name="userPwd" id="userPwd" required />
        <label class="signup__label" for="userPwd">Password</label>
      </div>

      <div class="signup__field">
        <button type="submit">Sign up</button>
      </div>

      <div class="signup__field">
        <div class="signup__confirm mt-3">
          <input v-model="userData.userAge" type="checkbox" id="userAge" class="signup__checkbox" required />
          <label for="userAge" class="signup__checkbox-label">Confirm information</label>
        </div>
      </div>
    </form>
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
        emailAdd: '',
        userPwd: '',
        userAge: false,
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.userData.userAge) {
          console.error('You must be 18 years or older.');
          return;
        }
        await this.$store.dispatch('register', this.userData);
        this.$router.push("/login");
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
    redirectToLoginPage() {
      this.$router.push({ name: 'loginPage' });
    }
  }
};
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  button,
  input {
    border: none;
    outline: none;
  }

/********FORM********/

 
  .signup-container {
    margin-top: 10px;
    max-width: 300px; 
  }

  .signup {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin: 0 auto; 
  }

  h1 {
    text-align: center;
    color: #e62020;
  }

  h2 {
    text-align: center;
    font-size: 1rem;
    font-weight: lighter;
    margin-bottom: 20px;
  }

  h2 span {
    text-decoration: underline;
    cursor: pointer;
    color: #e62020;
  }

  /* Field */
  .signup__field {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
  }

  .signup__field:before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 0px;
    height: 2px;
    background: #e62020;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.4s ease;
  }

  .signup__field:hover:before {
    width: 100%;
  }

  /* Input */
  .signup__input {
    width: 100%;
    font-size: 1rem;
    padding: 10px 2px 0;
    border-bottom: 2px solid #e0e0e0;
  }

  /* Label */
  .signup__label {
    color: #bdbdbd;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .signup__input:focus + .signup__label,
  .signup__input:valid + .signup__label {
    top: 0;
    font-size: 0.8rem;
    background-color: white;
  }

  /* Checkbox */
  .signup__checkbox-label {
    color: #bdbdbd;
    font-size: 1rem;
    margin-left: 10px;
  }

  .signup__checkbox {
    margin-top: 10px;
  }

  /* Button */
  button {
    background: #e62020;
    color: white;
    padding: 10px 0;
    font-size: 1rem;
    border-radius: 25px;
    cursor: pointer;
  }

  button:hover {
    background: #4b111b;
  }

  body {
    background-color: #4b111b;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #4b111b;
    padding: 0 10px; 
  }

  /* Media queries for responsiveness */
  @media screen and (min-width: 500px) {
    .signup {
      width: 400px; 
    }
  }

  @media screen and (min-width: 800px) {
    .signup {
      width: 500px; 
    }
  }
</style>
