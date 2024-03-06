<template>
    <div class="adminpage bg-black  mt-5">
      <div class="col">
        <h2 class="admin text-white">User</h2>
        <div class="row">

        </div>
        <div class="container">
          <table class="table table-striped-columns rounded-3">
            <thead>
              <tr>
                <th scoped="col">User ID</th>
                <th scoped="col">First name</th>
                <th scoped="col">Last name</th>
                <th scoped="col">User Age</th>
                <th scoped="col">Gender</th>
                <th scoped="col">User Role</th>
                <th scoped="col">Email address</th>
                <th scoped="col">User Profile</th>
                <th scoped="col">User Image</th>
                <th scoped="col">Action</th>
              </tr>
            </thead>
            <tbody v-if="users">
              <tr v-for="user in users" :key="user.userID">
                <td>{{ user.userID }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.userAge }}</td>
                <td>{{ user.Gender }}</td>
                <td>{{ user.userRole }}</td>
                <td>{{ user.emailAdd }}</td>
                <td>{{ user.userProfile }}</td>
                <td>{{ user.userImg }}</td>

                <td>
                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary btn-block">Edit</button>
                    </div>
                    <div class="col">
                      <button class="btn btn-danger btn-block" @click="deleteUser(user.userID)">Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="col">
        <h2 class="admin text-white">Product</h2>
        <div class="row">
          <router-link to="/add/product" class="btn btn-primary float-end">
            Add Product
          </router-link>
  
        </div>
        <div class="container">
          <table class="table table-striped-columns rounded-5">
            <thead>
              <tr>
                <th scoped="col">Product ID</th>
                <th scoped="col">Product Name</th>
                <th scoped="col">Product Category</th>
                <th scoped="col">Product Amount</th>
                <th scoped="col">Action</th>
              </tr>
            </thead>
            <tbody v-if="products">
              <tr v-for="product in products" :key="product.prodID">
                <td><img :src="product.prodUrl" style="height: 100px;" /></td>
                <td>{{ product.prodID }}</td>
                <td>{{ product.prodName }}</td>
                <td>{{ product.prodQuantity }}</td>
                <td>{{ product.prodAmount }}</td>
                <td>{{ product.prodUrl }}</td>
                <td> {{ product.Category }}</td>
                <td> {{ product.prodDescription }}</td>
                <td>
                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary btn-block">Edit</button>
                    </div>
                    <div class="col">
                      <button class="btn btn-danger btn-block" @click="deleteProduct(product.prodID)">Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      users() {
        return this.$store.state.users;
      },
      products() {
        return this.$store.state.products;
      },
    },
    mounted() {
      this.$store.dispatch('fetchUsers');
      this.$store.dispatch('fetchProducts');
    },
    methods: {
    deleteUser(userId) {
      try {
        this.$store.dispatch('deleteUser', { id: userId });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    deleteProduct(productId) {
      try {
        this.$store.dispatch('deleteProduct', { id: productId });
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
  
  }
  </script>
  
  <style scoped>
  

  </style>
  