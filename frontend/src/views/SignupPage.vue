<template>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center pt-3">
          <p>Add logo</p>
        </div>
      </div>
  
      <!-- Header -->
  
      <div class="row">
        <div class="col-12 justify-content-center d-flex pt-3">
          <div id="signup" class="flex-item border">
            <h2 class="pt-4 pl-4">Create Account</h2>
            <form @submit="signup" class="pt-4 pl-4 pr-4">
              <div class="form-group">
                <label for="Email">Email</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label> First Name</label>
                    <input
                      type="text"
                      v-model="firstName"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label> Last Name</label>
                    <input
                      type="text"
                      v-model="lastName"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <!-- password -->
              <div class="form-group">
                <label for="Password"> Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>
  
              <!-- confirm password -->
              <div class="form-group">
                <label for="Password"> Confirm password</label>
                <input
                  type="password"
                  v-model="confirmPassword"
                  class="form-control"
                  required
                />
              </div>
  
              <button class="btn btn-primary mt-2">Create Account</button>
            </form>
          </div>
        </div>
      </div>
  
    </div>
  </template>

  <script>

<style scoped>

</style>