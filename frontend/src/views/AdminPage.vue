<template>
    <div class="adminpage bg-black mt-5">
      <!-- User Section -->
      <div class="col container">
        <h2 class="admin text-white">Add User</h2>
        <router-link to="/adminadduser" class="btn btn-primary">Add User</router-link>
      </div>
      <div>
        <table class="table container table-striped-columns rounded-3 text-center">
          <!-- Table header -->
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
          <!-- Table body -->
          <tbody v-if="!loadingUsers && users">
            <tr v-for="user in users" :key="user.userID">
              <td>{{ user.userID }}</td>
              <td>{{ user.firstName }} </td>
              <td>{{ user.lastName }} </td>
              <td>{{ user.Gender }}</td>
              <td>{{ user.userRole }}</td>
              <td>{{ user.emailAdd }}</td>
              <td>{{ user.userProfile }}</td>
              <td>
                <!-- Edit button -->
                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary" @click="openEditUserModal(user)">Edit</button>
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
      <div class="spinner-container" v-if="loadingItems || loadingUsers">
        <SpinnerComponent :loading="loadingItems || loadingUsers" />
      </div>
      <div v-else>
        <!-- Button to open AddItemModal -->
        <button @click="showAddItemModal = true" class="btn btn-primary mb-3">Add Item</button>
  
        <!-- Modal for adding items -->
        <div v-if="showAddItemModal">
          <AddItemModal @close="showAddItemModal = false" />
        </div>
  
        <!-- Table for displaying items -->
        <div>
          <table class="table table-striped-columns rounded-5 text-center">
            <!-- Table header -->
            <thead>
              <tr>
                <th scoped="col">Item Img</th>
                <th scoped="col">Item ID</th>
                <th scoped="col">Item Name</th>
                <th scoped="col">Item Quantity</th>
                <th scoped="col">Item Amount</th>
                <th scoped="col">Category</th>
                <th scoped="col">Description</th>
                <th scoped="col">Action</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody v-if="!loadingItems && items">
              <tr v-for="item in items" :key="item.itemID">
                <td><img :src="item.itemUrl" style="height: 100px;" /></td>
                <td>{{ item.itemID }}</td>
                <td>{{ item.itemName }}</td>
                <td>{{ item.itemQuantity }}</td>
                <td>{{ item.itemAmount }}</td>
                <td>{{ item.Category }}</td>
                <td>{{ item.itemDescription }}</td>
                <td>
                  <!-- Edit button -->
                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary btn-block" @click="openEditItemModal(item)">Edit</button>
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
  
    <!-- Bootstrap modal for editing items -->
    <div v-if="showEditProductsModal">
      <div class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
        <!-- Modal content goes here -->
        <editProductAdmin :editedProduct="selectedItem" @close="closeEditModal" />
      </div>
      <div class="modal-backdrop fade show"></div>
    </div>
  
  </template>
  
  
  <script>
  import SpinnerComponent from "@/components/SpinnerComponent.vue";
  import AddItemModal from "../components/UsersAdmin/AddProductAdmin.vue";
  import editProductAdmin from "../components/UsersAdmin/EditProductsAdmin.vue";
  // import AddUserAdmin from "@/components//UsersAdmin/AddUserAdmin.vue"; 
  
  
  export default {
    components: {
      SpinnerComponent,
      AddItemModal,
      editProductAdmin,
      // AddUserAdmin,
  
    },
    data() {
      return {
        loadingItems: true,
        loadingUsers: true,
        showAddItemModal: false,
        showEditProductsModal: false,
        selectedItem: null,
        selectedUser: null,
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
      // Fetch users and items data
      this.fetchData();
    },
    methods: {
      fetchData() {
        // Fetch users data
        this.$store.dispatch("fetchUsers")
          .then(() => {
            this.loadingUsers = false;
            this.checkLoadingStatus();
          })
          .catch(error => {
            console.error("Error fetching users:", error);
          });
  
        // Fetch items data
        this.$store.dispatch("fetchItems")
          .then(() => {
            this.loadingItems = false;
            this.checkLoadingStatus();
          })
          .catch(error => {
            console.error("Error fetching items:", error);
          });
      },
      deleteUser(userId) {
        try {
          this.$store.dispatch("deleteUser", { id: userId });
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
      deleteItem(itemID) {
        try {
          this.$store.dispatch("deleteItem", { id: itemID });
        } catch (error) {
          console.error("Error deleting Items:", error);
        }
      },
      openEditItemModal(item) {
        this.selectedItem = item;
        this.showEditProductsModal = true;
      },
      openEditUserModal(user) {
        this.selectedUser = user;
        this.showEditProductsModal = true;
      },
      closeEditModal() {
        this.showEditProductsModal = false;
      },
      checkLoadingStatus() {
        if (!this.loadingItems && !this.loadingUsers) {
          // Set loading to false after both users and items fetching is completed
          this.loading = false;
        }
      },
      logEditButtonClick(item) {
        console.log("Edit button clicked for item:", item);
      }
    },
  };
  </script>
  
  <style scoped>
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  