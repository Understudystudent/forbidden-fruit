<template>
  <div class="container">
    <div class="row">
      <!-- Left Column -->
      <div class="col-lg-3">
        <div class="browse-by">
          <div class="section-title">Browse By</div>
          <hr class="section-divider">
          <div class="browse-options">
            <p>All Products</p>
            <!-- Add more browse options here -->
          </div>
          <div class="filter-by">
            <div class="section-title">Filter By</div>
            <hr class="section-divider">
            <p>Price</p>
            <!-- Add more filter options here -->
          </div>
        </div>
      </div>

      <!-- Middle and Right Column -->
      <div class="col-lg-9">
        <div class="banner">
          <h1 class="text-center">All Products</h1>
        </div>
        <div class="top-bar">
          <div class="top-left">
            <p>{{ numberOfItems }} Items</p>
          </div>
          <div class="top-right">
            <p>Sort By: <a href="#">Recommended Products</a></p>
          </div>
        </div>
        <div class="products">
          <div class="row">
            <ProductItem v-for="item in items" :key="item.id" :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductList.vue';

export default {
  data() {
    return {
      numberOfItems: 0,
      items: []
    }
  },
  components: {
    ProductItem
  },
  methods: {
    async fetchItems() {
      try {
        await this.$store.dispatch('fetchItems');
        this.items = this.$store.state.items;
        this.numberOfItems = this.items.length;
      } catch (error) {
        console.error('Error fetching items:', error);
        // Handle error
      }
    }
  },
  mounted() {
    this.fetchItems();
  }
}
</script>

<style scoped>
.browse-by {
  margin-bottom: 40px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-divider {
  border-top: 1px solid #ccc;
}

.products {
  margin-top: 20px;
}

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

.top-bar, .bottom-bar {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.top-left, .bottom-left {
  font-weight: bold;
}

.top-right, .bottom-right {
  text-align: right;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
