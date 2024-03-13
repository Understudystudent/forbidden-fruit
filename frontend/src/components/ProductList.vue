<template>
  <div class="col-lg-3 product">
    <img class="product-image" :src="item.itemUrl" alt="Product Image">
    <div class="product-details">
      <h3 class="product-name">{{ item.itemName }}</h3>
      <p class="product-price">{{ item.itemAmount }}</p>
      <router-link :to="'/products/' + item.id" class="btn btn-primary">View Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.product {
  margin-bottom: 20px;
}

.product-image {
  width: 100%;
  height: auto;
}

.product-details {
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

.product-name {
  font-weight: bold;
}

.product-price {
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
