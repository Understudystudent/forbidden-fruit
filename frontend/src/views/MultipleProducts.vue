<template>
    <div>
      <h1>Products</h1>
      <ProductList />
    </div>
  </template>
  
  <script>
  import ProductList from '@/components/ProductList.vue';
  
  export default {
    name: "MultipleProducts",
    components: {
      ProductList
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  