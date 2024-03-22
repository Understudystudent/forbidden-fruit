<template>
    <div class="bg-black vh-100">
      <div class="row">
        <h1 class="display-2 text-white text-center">Item Details</h1>
      </div>
      <div class="row">
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <!-- Image on the left with fixed height -->
          <div class="item-image-container">
            <img v-if="item" :src="item.itemUrl" alt="Item Image" class="item-image" />
          </div>
        </div>
        <div class="col-md-6">
          <div v-if="item" class="item-details">
            <!-- Item details -->
            <h2 class="item-title text-white">{{ item.itemName }}</h2>
            <p class="item-description text-white">{{ item.itemDescription }}</p>
            <div class="item-actions">
              <p class="item-info text-white">Category: {{ item.Category }}</p>
              <p class="item-info text-white">Amount: R {{ item.itemAmount }}</p>
              <div class="quantity">
                <label for="quantity" class="text-white">Quantity:</label>
                <input type="number" id="quantity" v-model="quantity" min="1" class="form-control">
              </div>
              <button @click="addItemToCart" class="btn btn-danger btn-block mx-3">Add to Cart</button>
              <button @click="goBack" class="btn btn-secondary btn-block">Go Back</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: "SinglePage",
    computed: {
      ...mapState(['items']),
      item() {
        if (this.items && this.items.length > 0) {
          const itemId = parseInt(this.$route.params.itemID);
          return this.items.find(item => item.itemID === itemId);
        } else {
          return null;
        }
      }
    },
    data() {
      return {
        quantity: 1
      };
    },
    methods: {
      ...mapActions(['addToCart']),
      goBack() {
        this.$router.push({ name: 'MultipleProducts' });
      },
      addItemToCart() {
        if (this.item) {
          console.log('Adding item to cart:', this.item); // Add this line to log item being added to cart
          this.addToCart({ itemId: this.item.itemID, quantity: parseInt(this.quantity) });
          this.$router.push({ path: '/products' });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styling for the item image */
  .item-image-container {
    height: 300px; /* Set fixed height */
    overflow: hidden; /* Hide overflow */
  }
  .item-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio and cover container */
    transition: transform 0.3s ease; /* Add smooth transition */
  }
  .item-image:hover {
    transform: scale(1.1); /* Add scale effect on hover */
  }
  
  /* Styling for item details */
  .item-details {
    padding: 0 20px;
  }
  .item-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .item-description {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .item-info {
    margin-bottom: 10px;
  }
  .quantity {
    margin-bottom: 20px;
  }
  .item-actions button {
    margin-top: 10px;
    font-size: 16px; 
  }
  </style>
  