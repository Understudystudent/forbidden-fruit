<template>
  <div class="adminpage bg-black mt-5">
    <!-- User Section -->
    <div class="col">
      <h2 class="admin text-white">User</h2>
      <div class="row"></div>
      <div>
        <table class="table table-striped-columns rounded-3 text-center">
          <thead>
            <tr>
              <th scoped="col">ID</th>
              <th scoped="col">First name</th>
              <th scoped="col">Surname </th>
              <th scoped="col">Gender</th>
              <th scoped="col">Role</th>
              <th scoped="col">Email address</th>
              <th scoped="col"> Profile</th>
              <th scoped="col">Action</th>
            </tr>
          </thead>
          <tbody v-if="users">
            <tr v-for="user in users" :key="user.userID">
              <td>{{ user.userID }}</td>
              <td>{{ user.firstName }} </td>
              <td>{{ user.lastName }} </td>
              <td>{{ user.Gender }}</td>
              <td>{{ user.userRole }}</td>
              <td>{{ user.emailAdd }}</td>
              <td>{{ user.userProfile }}</td>
              <td>
                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary">Edit</button>
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
    <!-- Products -->
    <div class="col">
      <h2 class="admin text-white">Product</h2>
      <div class="spinner-container" v-if="loading">
        <Spinner :loading="loading" />
      </div>
      <div v-else>
        <!-- <div class="row">
          <router-link to="/add/product" class="btn btn-primary float-end">
            Add Product
          </router-link>
        </div> -->
        <addProductComp />
        <div>
          <table class="table table-striped-columns rounded-5 text-center">
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
                <td>{{ item.Category }}</td>
                <td>{{ item.itemDescription }}</td>
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
    <!-- Cart  Cant do Cart system Right now-->
    <div class="col">
      <h2 class="admin text-white">Cart</h2>
      <div>
        <tbody v-if="adminItems">
          <tr v-for="adminItem in adminItems" :key="adminItem.itemID"></tr>
        </tbody>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/SpinnerComponent.vue";
import addProductComp from "../components/UsersAdmin/AddProductAdmin.vue";

export default {
  components: {
    Spinner,
    addProductComp
  },
  data() {
    return {
      loading: true // Set to true initially to show spinner
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    items() {
      return this.$store.state.items;
    },
  },
  mounted() {
    // Simulate data fetching delay for demonstration
    setTimeout(() => {
      // Set loading to false after data fetching is completed
      this.loading = false;
    }, 2000); // Adjust delay time as needed

    // Fetch users and items data
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
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
