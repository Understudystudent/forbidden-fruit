<template>
    <div>
      <div class="grid-wrap">
        <div class="product-item" v-for="item in items" :key="item.id">
          <img :src="item.itemUrl" />
          <h3 class="product-name">{{ item.itemName }}</h3>
          <p class="product-price">{{ item.itemAmount }}</p>

          <router-link :to="'/products/' + item.id">
            <button>View Details</button>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductList",
    computed: {
      items() {
        return this.$store.state.items;
      },
    },
    mounted() {
      this.$store.dispatch('fetchItems');
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  