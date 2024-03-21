<template>
  <div class="bg-black">
    <div class="row">
      <h1 class="display-2 text-white">Item Details</h1>
    </div>
    <div class="row">
      <div class="col-md-6">
        <!-- Image on the left -->
        <img v-if="item" :src="item.prodUrl" alt="Item Image" class="card-image bg-black" />
      </div>
      <div class="col-md-6">
        <div v-if="item">
          <h2 class="item-title text-white">Name: {{  item.itemName }}</h2>
          <p class="item-info text-white">Category: {{ item.Category }}</p>
          <p class="item-info text-white">Amount: R {{ item.itemAmount }}</p>
          <p class="item-description text-white">Description: {{ item.itemDescription }}</p>
          <label for="quantity" class="text-white">Quantity:</label>
          <input type="number" id="quantity" v-model="quantity" min="1">
          <button @click="addItemToCart" class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
    <button @click="goBack" class="btn btn-primary">Go Back</button>
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
        this.addToCart({ itemId: this.item.itemID, quantity: parseInt(this.quantity) });
        this.$router.push({ path: '/products' });
      }
    }
  }
};
</script>

<style scoped></style>
