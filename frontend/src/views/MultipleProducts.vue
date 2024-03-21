<template>
  <div class="container">
    <!-- Spinner Component -->
    <SpinnerLoader :loading="isLoading" />

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
            <p>Price: R{{ selectedPrice }}</p>
            <input type="range" class="form-range" id="priceRange" min="0" :max="maxPrice" v-model="selectedPrice"
              @input="filterItems">
            <button class="btn btn-secondary" @click="resetFilters">Reset</button>
          </div>

        </div>
      </div>

      <!-- Middle and Right Column -->
      <div class="col-lg-9">
        <div class="banner">
          <h1 class="text-center">All Products</h1>
        </div>
        <!-- Search Bar -->
        <div class="search-bar">
          <input type="text" class="form-control" placeholder="Search products..." v-model="searchQuery" @input="filterItems">
        </div>
        <!-- Top Bar -->
        <div class="top-bar">
          <div class="top-left">
            <div class="top-left">
           <p>{{ filteredItems.length }} Products</p>
          </div>
          </div>
          <div class="top-right">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span class="sort-label">Sort By:</span>
                <span class="selected-sort">{{ selectedSort }}</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="sortDropdown" @click="updateSelectedSort">
                <li><a class="dropdown-item" href="#" data-name="Recommended">Recommended</a></li>
                <li><a class="dropdown-item" href="#" data-name="Expensive">Expensive</a></li>
                <li><a class="dropdown-item" href="#" data-name="A-Z">A-Z</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="products">
          <div class="row">
            <ProductItem v-for="item in filteredItems" :key="item.id" :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductList.vue';
import SpinnerLoader from '../components/SpinnerComponent.vue';

export default {
  data() {
    return {
      isLoading: true,
      numberOfItems: 0,
      items: [],
      filteredItems: [],
      selectedSort: 'Recommended',
      maxPrice: 0,
      minPrice: 0,
      selectedPrice: 0,
      searchQuery: ''
    }
  },
  components: {
    ProductItem,
    SpinnerLoader
  },
  methods: {
    async fetchItems() {
      try {
        await this.$store.dispatch('fetchItems');
        this.items = this.$store.state.items;
        this.filteredItems = [...this.items];
        this.numberOfItems = this.items.length;

        // Store items in local storage
        localStorage.setItem('items', JSON.stringify(this.items));

        this.maxPrice = Math.max(...this.items.map(item => item.itemAmount));
        this.minPrice = Math.min(...this.items.map(item => item.itemAmount));

        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    updateSelectedSort(event) {
      this.selectedSort = event.target.dataset.name;
      this.sortItems();
    },
    sortItems() {
      switch (this.selectedSort) {
        case 'Expensive':
          this.filteredItems.sort((a, b) => b.itemAmount - a.itemAmount);
          break;
        case 'Latest':
          this.filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'A-Z':
          this.filteredItems.sort((a, b) => a.itemName.trim().toLowerCase().localeCompare(b.itemName.trim().toLowerCase()));
          break;
        default:
          break;
      }
    },
    filterItems() {
      if (this.selectedPrice === 0) {
        this.filteredItems = this.items.filter(item => item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } else {
        this.filteredItems = this.items.filter(item => item.itemAmount >= this.selectedPrice && item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
    },
    resetFilters() {
      this.selectedPrice = 0;
      this.selectedSort = 'Recommended';
      this.searchQuery = '';
      this.filterItems();
    }
  },
  mounted() {
    console.log(this);
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

.search-bar {
  margin-bottom: 20px;
}

@media (max-width: 500px) {
  .top-bar {
    flex-direction: column;
  }
  .top-left {
    margin-top: 10px; 
  }
}
</style>
