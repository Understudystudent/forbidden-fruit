<template>
    <div class="adminpage bg-black  mt-5">
      <div class="col">
        <h2 class="admin text-white">User</h2>
        <div class="row">

        </div>
        <div >
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
        <!-- <div class="row">
          <router-link to="/add/product" class="btn btn-primary float-end">
            Add Product
          </router-link>
        </div> -->
        <div >
          <table class="table table-striped-columns rounded-5">
            <thead>
              <tr>
                <th scoped="col">Item Img</th>
                <th scoped="col">Item ID</th>
                <th scoped="col">Item Name</th>
                <th scoped="col">Item Quanity</th>
                <th scoped="col">Item Amount</th>
                <th scoped="col">Category</th>
                <th scoped="col">Description</th>
                <th scoped="col">Action</th>

              </tr>
            </thead>
            <tbody v-if="items">
              <tr v-for="item in items" :key="item.itemID">
                <td><img :src="item.itemUrl" style="height: 100px;" /></td>
                <td>{{ item.itemID }}</td>
                <td>{{ item.itemName }}</td>
                <td>{{ item.itemQuantity }}</td>
                <td>{{ item.itemAmount }}</td>
                <td> {{ item.Category }}</td>
                <td> {{ item.itemDescription }}</td>
                <td>
                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary btn-block">Edit</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-success deleteButton" @click="event => deleteItem(item.itemID)">Delete</button>
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
      items() {
        return this.$store.state.items;
      },
    },
    mounted() {
      this.$store.dispatch('fetchUsers');
      this.$store.dispatch('fetchItems');
    },
    methods: {
    deleteUser(userId) {
      try {
        this.$store.dispatch('deleteUser', { id: userId });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    deleteItem(itemID) {
      try {
        this.$store.dispatch('deleteItem', { id: itemID });
      } catch (error) {
        console.error('Error deleting Items:', error);
      }
    }
  }
  
  }
  </script>
  
  <style scoped>
  

  </style>
  