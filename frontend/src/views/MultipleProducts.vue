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
          </div>
          <div class="filter-by">
            <div class="section-title">Filter By</div>
            <hr class="section-divider">
            <p>Price: R{{ minPrice }} - R{{ maxPrice }}</p>
            <input type="range" class="form-range" id="priceRange" min="0" :max="maxPrice" v-model="selectedPrice">
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
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="sort-label">Sort By:</span>
                <span class="selected-sort">{{ selectedSort }}</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="sortDropdown" @click="updateSelectedSort">
                <li><a class="dropdown-item" href="#" data-name="Recommended">Recommended</a></li>
                <li><a class="dropdown-item" href="#" data-name="Expensive">Expensive</a></li>
                <li><a class="dropdown-item" href="#" data-name="Latest">Latest</a></li>
                <li><a class="dropdown-item" href="#" data-name="A-Z">A-Z</a></li>
              </ul>
            </div>
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
      items: [],
      selectedSort: 'Recommended',
      maxPrice: 0 
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
        
        // Calculate max price
        this.maxPrice = Math.max(...this.items.map(item => item.itemAmount));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    updateSelectedSort(event) {
      this.selectedSort = event.target.dataset.name;
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

.top-bar {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.top-left {
  font-weight: bold;
}

.top-right {
  text-align: right;
}

.btn-secondary {
  width: 300px; 
}

.sort-label {
  margin-right: 5px;
}

.selected-sort {
  font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
