<template>
    <div class="conatiner">
      <div class="row">
        <div class="col-12 justify-content-center d-flex flex-row pt-5">
          <div id="signin" class="flext-item border">
            <h2 class="pt-4">Sign-In</h2>
            <form @submit="signin" class="form-group pt-4 pl-4 pr-4">
              <div class="form-group">
                <label>Email </label>
                <input v-model="email" type="email" class="form-control" />
              </div>
              <div class="form-group">
                <label>Password </label>
                <input v-model="password" type="password" class="form-control" />
              </div>
              <button class="btn btn-primary mt-2 py-0">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>

  </script>
  <style scoped>

  </style>