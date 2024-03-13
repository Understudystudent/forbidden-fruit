<template>
    <div class="bg-black">
      <div class="row">
        <h1 class="display-2 text-white">item Details</h1>
      </div>
      <div class="row">
        <div class="col-md-6">
          <!-- Image on the left -->
          <Card v-if="item">
            <template>
              <img :src="item.prodUrl" alt="item-image" class="card-image bg-black" />
            </template>
          </Card>
        </div>
        <div class="col-md-6">
          <Card v-if="item">
            <template>
              <h2 class="item-title">{{ item.prodName }}</h2>
              <p class="item-info">Category: {{ item.Category }}</p>
              <p class="item-info">Amount: R {{ item.amount }}</p>
              <p class="item-description">{{ item.description }}</p>
            </template>
          </Card>
  
          <!-- <div class="mt-3">
            <router-link to="/items">
              <button class="btn btn-primary">Go Back</button>
              </router-link>
            <button class="btn btn-success">Purchase</button>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>

  export default {
 
    computed: {
      items() {
        return this.$store.state.items;
      },
    },
    mounted() {
      this.$store.dispatch('fetchItems', this.$route.params);
    },
  };
  </script>
  
  <style scoped>

  </style>
  