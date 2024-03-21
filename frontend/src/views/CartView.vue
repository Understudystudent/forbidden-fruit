<template>
  <div class="cart-view bg-dark text-white">
    <h1 class="text-center">Your Shopping Cart</h1>
    <!-- Display spinner when loading data -->
    <spinner-loader :loading="loading" />
    <div v-if="!cartItems || cartItems.length === 0">
      <p v-if="!loading" class="vh-100 text-white text-center">Your cart is empty.</p>
    </div>
    <div v-else>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.itemName }}</td>
            <td>{{ item.Category }}</td>
            <td>R {{ item.itemAmount }}</td>
            <td>{{ item.itemDescription }}</td>
            <td>
              <input type="number" v-model="item.quantity" min="1" class="form-control">
            </td>
            <td>
              <button @click="updateCartItem(item)" class="btn btn-primary">Update</button>
              <button @click="removeCartItemByItemID(item.itemID)" class="btn btn-danger">Remove by ItemID</button>
              <button @click="removeCartItemByCartID(item.cartID)" class="btn btn-danger">Remove by CartID</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SpinnerLoader from "@/components/SpinnerComponent.vue"; 

export default {
  components: {
    SpinnerLoader, 
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    // Map cartItems
    cartItems() {
      return this.$store.state.cartItems.results;
    }
  },
  methods: {
    // Method to update cart item quantity
    updateCartItem(item) {
      const userID = this.getUserID();
      if (!userID) {
        console.error('User ID is undefined');
        return;
      }
      console.log('Updating cart item:', item); // Add this line to log updated cart item
      // action to update cart item quantity
      this.$store.dispatch('updateCartItem', {
        userID: userID,
        itemID: item.itemID,
        quantity: item.quantity
      }).then(() => {
        console.log('Cart item updated successfully');
      }).catch(error => {
        console.error('Failed to update cart item:', error);
      });
    },
    // Remove cart item by ItemID
    removeCartItemByItemID(itemID) {
      const userID = this.getUserID();
      if (!userID) {
        console.error('User ID is undefined');
        return;
      }
      console.log('Removing cart item by ItemID:', itemID); // Add this line to log itemID
      this.$store.dispatch('removeCartItemByItemID', itemID)
        .then(() => {
          console.log('Cart item removed successfully by ItemID');
          // Optionally, you can fetch updated cart items after removing an item
          this.$store.dispatch('fetchCartItems');
        })
        .catch(error => {
          console.error('Failed to remove cart item by ItemID:', error);
        });
    },
    // Remove cart item by CartID
    removeCartItemByCartID(cartID) {
      const userID = this.getUserID();
      if (!userID) {
        console.error('User ID is undefined');
        return;
      }
      console.log('Removing cart item by CartID:', cartID); // Add this line to log cartID
      this.$store.dispatch('removeCartItemByCartID', cartID)
        .then(() => {
          console.log('Cart item removed successfully by CartID');
          // Optionally, you can fetch updated cart items after removing an item
          this.$store.dispatch('fetchCartItems');
        })
        .catch(error => {
          console.error('Failed to remove cart item by CartID:', error);
        });
    },
    // Method to get userID from Vuex state or cookies
    getUserID() {
      const userData = this.$store.state.userData;
      if (userData && userData.result && userData.result.userID) {
        // Get user ID from Vuex state if available
        return userData.result.userID;
      } else {
        // Get user ID from cookies if available
        const userDataFromCookie = JSON.parse(localStorage.getItem('userData'));
        if (userDataFromCookie && userDataFromCookie.result && userDataFromCookie.result.userID) {
          return userDataFromCookie.result.userID;
        } else {
          console.error('User data or userID is undefined');
          return null;
        }
      }
    }
  },
  created() {
    this.loading = true; // Set loading state to true when data loading starts
    // Fetch cart items when the component is created
    this.$store.dispatch('fetchCartItems')
      .then(() => {
        // Set loading state to false when data loading is complete
        this.loading = false;
        
        // Retrieve cart items from local storage
        let cartItemsFromStorage = JSON.parse(localStorage.getItem('items'));
        console.log('Cart items from local storage:', cartItemsFromStorage);

        // Check if there are items in the cart
        if (cartItemsFromStorage && cartItemsFromStorage.length > 0) {
          // Iterate through the cart items
          cartItemsFromStorage.forEach((cartItem, index) => {
            // Find the matching item in the fetched cart items
            let matchingCartItem = this.cartItems.find(item => String(item.itemID) === String(cartItem.itemID));
            
            // If a matching item is found, display its details
            if (matchingCartItem) {
              console.log(`Item ${index + 1} Name:`, matchingCartItem.itemName);
              console.log(`Item ${index + 1} Price:`, matchingCartItem.itemAmount);
              // Update quantity from local storage
              matchingCartItem.quantity = cartItem.itemQuantity;
            }
          });
        } else {
          console.log('Cart is empty or not found in local storage.');
        }
      })
      .catch(() => {
        // Set loading state to false if there's an error during data loading
        this.loading = false;
      });
  }
};
</script>

<style>
/* Add your styles here */
</style>
