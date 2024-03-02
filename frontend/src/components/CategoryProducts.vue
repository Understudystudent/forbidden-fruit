<template>
  <section class="category-products">
    <div class="container">
      <div class="row category-header">
        <div class="col-md-6">
          <h3>Candles</h3>
        </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <div class="btn-group" role="group">
            <button
              v-for="(tab, i) in tabs"
              :key="i"
              class="btn btn-outline-secondary"
              @click="activeIndex = i"
              :class="{ active: activeIndex === i }"
            >
              {{ tab }}
            </button>
          </div>
        </div>
      </div>

      <div class="row products">
        <div v-for="n in 6" :key="n" class="col-md-4">
          <div class="card single-product">
            <img class="card-img-top" src="../assets/1.png" alt="">
            <div class="card-body product-content">
              <h6 class="card-title name">Header</h6>
              <div class="rating">
                <span class="price">Price</span>
                <div class="icon">
                  <img src="../assets/rating.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <button class="btn btn-primary">
            SEE MORE
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- JavaScript -->
<script setup>
import { ref } from "vue";

const tabs = ref([
  "NEW ARRIVALS",
  "SPECIALS",
  "BESTSELLERS",
  "MOST VIEWED", 
  "FEATURED PRODUCTS",
]);

const activeIndex = ref(0);
</script>

<!-- CSS -->
<style scoped>
.category-header {
  margin-bottom: 50px;
}

.category-header h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1rem;
}

.products {
  margin-bottom: 20px;
}

.single-product {
  margin-bottom: 20px;
}
</style>
