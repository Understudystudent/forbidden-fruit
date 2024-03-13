<template>
    <div class="products bg-black">
      <div class="row bg-black">
        <div class="col my-3" id="search">
          <input type="text" v-model="searchQuery" @input="filterProducts" placeholder="Search product by name" class="form-control mx-1">
        </div>
        <div class="col">
          <button class="btn btn-info my-3" @click="sortByPrice">Sorting by price</button>
        </div>
      </div>
      <div class="row m-5 justify-content-center" v-if="filteredProducts.length > 0">
        <Card v-for="product in filteredProducts" :key="product.prodID" class="bg-black">
          <template #cardHeader>
            <img :src="product.prodUrl" alt="product-image" class="card-image bg-black" />
          </template>
          <template #cardBody>
            <div class="bg-white rounded">
              <h3 class="product-info text-black">{{ product.prodName }}</h3>
              <p class="product-info text-black">Category: {{ product.Category }}</p>
              <p class="product-info text-black">Amount: R {{ product.amount }}</p>
              <router-link class="btn bg-black text-white my-1" :to="{ name: 'product', params: { id: product.prodID } }">View More</router-link>
            </div>
          </template>
        </Card>
      </div>
      <div class="row" v-else>
        <p class="lead">No products found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import Card from '@/components/Card.vue';
  export default {
    name: 'ProductsView',
    components: {
      Card
    },
    data() {
      return {
        searchQuery: '',
        sortByPriceAsc: true
      };
    },
    computed: {
      products() {
        return this.$store.state.products;
      },
      filteredProducts() {
        if (!this.searchQuery) {
          return this.products;
        }
        const query = this.searchQuery.toLowerCase();
        return this.products.filter(product => product.prodName.toLowerCase().includes(query));
      }
    },
    methods: {
      sortByPrice() {
        this.sortByPriceAsc = !this.sortByPriceAsc;
        this.filteredProducts.sort((a, b) => {
          if (this.sortByPriceAsc) {
            return a.amount - b.amount;
          } else {
            return b.amount - a.amount;
          }
        });
      },
      filterProducts() {
        // Reset sorting order when filtering
        this.sortByPriceAsc = true;
      }
    },
    mounted() {
      this.$store.dispatch('fetchProducts');
    }
  }
  </script>
  
  <style scoped>
  h1 {
    font-family: 'Jacques Francois Shadow', cursive;
    font-size: 5rem;
  }
  
  .card-image {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  button {
    width: 200px;
    height: 50px;
    border-radius: 20px;
  }
  
  .product-info {
    font-family: Righteous;
  }
  
  .product {
    overflow-x: hidden;
  }
  </style>
  