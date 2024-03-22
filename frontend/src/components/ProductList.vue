<template>
    <div class="col-lg-3 ">
      <div class="card product bg-black h-100 d-flex flex-column justify-content-between">
        <img class="card-img-top product-image" :src="item.itemUrl" alt="Product Image">
        <div class="card-body bg-black">
          <h5 class="card-title product-name">{{ item.itemName }}</h5>
          <p class="card-text product-price text-white">R {{ item.itemAmount }}</p>
          <button @click="viewDetails" class="btn btn-primary d-block mx-auto">View Details</button>
        </div>
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
    },
    methods: {
      viewDetails() {
        this.$router.push({ name: 'ItemDetailPage', params: { itemID: this.item.itemID } });
      }
    }
  }
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif; 
  }
  
  .product {
    margin-bottom: 20px;
  }
  
  .product-image {
    width: 100%;
    height: 200px; /* Set a fixed height for the images */
    object-fit: cover; 
  }
  
  .product-details {
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5); 
    border: 1px solid #ddd;
    color: #fff; 
  }
  
  .product-name {
    font-weight: bold;
    color: #ffd700; 
  }
  
  .product-price {
    margin-bottom: 10px;
    color: #fff; /* Set price color to white */
  }
  
  .btn-primary {
    background-color: #8B0000; 
    color: #fff;
    border: none;
    width: 150px; /* Set button width */
  }
  
  .btn-primary:hover {
    background-color: #DC143C; 
  }
  
  /* Additional styles for black background */
  .card {
    background-color: black;
  }
  
  .card:hover {
    background-color: transparent;
  }
  
  .text-white {
    color: #fff; /* Set text color to white */
  }
  </style>
  