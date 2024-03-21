<template>
  <div class="cart-view bg-dark text-white">
    <h1>Your Shopping Cart</h1>
    <div v-if="!cartItems || cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <h2 class="item-title text-white">Name: {{ item.itemName }}</h2>
        <p class="item-info text-white">Category: {{ item.Category }}</p>
        <p class="item-info text-white">Amount: R {{ item.itemAmount }}</p>
        <p class="item-description text-white">Description: {{ item.itemDescription }}</p>
        <!-- Add quantity input and button for each item -->
        <label for="quantity" class="text-white">Quantity:</label>
        <input type="number" id="quantity" v-model="item.quantity" min="1">
        <button @click="updateCartItem(item)" class="btn btn-primary">Update Cart</button>
        <button @click="removeCartItemByItemID(item.id)" class="btn btn-danger">Remove from Cart (by ItemID)</button>
        <button @click="removeCartItemByCartID(item.cartID)" class="btn btn-danger">Remove Cart (by CartID)</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  computed: {
    // Map cartItems
    cartItems() {
      const items = this.$store.state.cartItems.results;
      console.log('Cart items:', items); // Add this line to log cart items
      return items;
    },
    // Access user ID from Vuex state or cookies
    userID() {
      const userData = this.$store.state.userData;
      if (userData && userData.result && userData.result.userID) {
        // Get user ID from Vuex state if available
        const userID = userData.result.userID;
        console.log('User ID from Vuex state:', userID); // Add this line to log user ID
        return userID;
      } else {
        // Get user ID from cookies if available
        const { cookies } = useCookies();
        const userDataFromCookie = cookies.get("userData");
        if (userDataFromCookie && userDataFromCookie.result && userDataFromCookie.result.userID) {
          const userIDFromCookie = userDataFromCookie.result.userID;
          console.log('User ID from cookie:', userIDFromCookie); // Add this line to log user ID from cookie
          return userIDFromCookie;
        } else {
          console.error('User data or userID is undefined');
          return null;
        }
      }
    }
  },
  methods: {
    // Method to update cart item quantity
    updateCartItem(item) {
      const userID = this.userID;
      if (!userID) {
        console.error('User ID is undefined');
        return;
      }
      console.log('Updating cart item:', item); // Add this line to log updated cart item
      // action to update cart item quantity
      this.$store.dispatch('updateCartItem', {
        userID: userID,
        itemID: item.id,
        quantity: item.quantity
      }).then(() => {
        console.log('Cart item updated successfully');
      }).catch(error => {
        console.error('Failed to update cart item:', error);
      });
    },
    // Remove cart item by ItemID
    removeCartItemByItemID(itemID) {
      const userID = this.userID;
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
      const userID = this.userID;
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
    }
  },
  created() {
    // Fetch cart items when the component is created
    this.$store.dispatch('fetchCartItems');
  }
};
</script>

<style>
</style>
