<template>
  <div class="cart-view">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length === 0">
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
        <button @click="removeCartItem(item)" class="btn btn-danger">Remove from Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // Map cartItems from the Vuex store state
    cartItems() {
      return this.$store.state.cartItems;
    }
  },
  methods: {
    // Method to update cart item quantity
    updateCartItem(item) {
      // action to update cart item quantity
      this.$store.dispatch('updateCartItem', {
        userID: this.$store.state.user.id,
        itemID: item.id,
        quantity: item.quantity
      }).then(() => {
        console.log('Cart item updated successfully');
      }).catch(error => {
        console.error('Failed to update cart item:', error);
      });
    },
    //  Remove cart item
    removeCartItem(item) {
      this.$store.dispatch('removeCartItem', {
        userID: this.$store.state.user.id,
        itemID: item.id
      }).then(() => {
        console.log('Cart item removed successfully');
      }).catch(error => {
        console.error('Failed to remove cart item:', error);
      });
    }
  }
};
</script>

<style>
/* Add your styling here */
</style>
