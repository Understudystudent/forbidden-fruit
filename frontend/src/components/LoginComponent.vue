<template>
    <div class="box">
      <form class="signin" @submit.prevent="handleSubmit" autocomplete="on">
        <h1>Welcome Home</h1>
        <h2>Ready to join <span @click="redirectToRegisterPage">Sign Up</span></h2>
  
        <div class="signin__field">
          <input v-model="userData.emailAdd" class="signin__input" type="text" name="emailAdd" id="emailAdd" required />
          <label class="signin__label" for="emailAdd">Email</label>
        </div>
  
        <div class="signin__field">
          <input v-model="userData.userPwd" class="signin__input" type="password" name="userPwd" id="userPwd" required />
          <label class="signin__label" for="userPwd">Password</label>
        </div>
  
        <button type="submit">Enter </button>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'loginPage',
    data() {
      return {
        userData: {
          emailAdd: '',
          userPwd: '',
        },
        error: '',
      };
    },
  
    methods: {
      async handleSubmit() {
        try {
          const { msg, token } = await this.$store.dispatch('login', {
            emailAdd: this.userData.emailAdd,
            userPwd: this.userData.userPwd,
          });
  
          if (token) {
            localStorage.setItem('userAuthenticated', token);
            this.$router.push('/');
          } else {
            this.error = msg;
          }
        } catch (e) {
          this.error = 'Failed to login.';
          console.error('Error during login:', e);
        }
      },
  
      redirectToRegisterPage() {
        this.$router.push({ name: 'register' });
      },
    },
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

/****************
      FORM
*****************/
.signin {
  background-color: white;
  width: 100%;
  max-width: 500px;
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  color:#e62020 ;
}

h2 {
  text-align: center;
  font-size: 1.2rem;
  font-weight: lighter;
  margin-bottom: 40px;
}

h2 span {
  text-decoration: underline;
  cursor: pointer;
  color:#e62020 ;
}

/*  Field */
.signin__field {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 50px;
}

.signin__field:before {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0px;
  height: 2px;
  background:#e62020 ;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.4s ease;
}

.signin__field:hover:before {
  width: 100%;
}

/*  Input */
.signin__input {
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  padding: 10px 2px 0;
  border-bottom: 2px solid #e0e0e0;
}

/*  Label */
.signin__label {
  color: #bdbdbd;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.signin__input:focus + .signin__label,
.signin__input:valid + .signin__label {
  top: 0;
  font-size: 1rem;
  background-color: white;
}

/*  Button */
button {
  background:#e62020 ;
  color: white;
  padding: 12px 0;
  font-size: 1.2rem;
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
background-color: black;

}
</style>


  