<template>
  <div>
    <div class="container">
      <div class="category-header">
        <h3>Candles</h3>
        <div class="tabs">
          <div
          v-for="(tab, i) in tabs"
          :key="tab"
          class="tab"
          @click="activeIndex = i"
          :class="{ active: activeIndex === i }"
        >
          {{ tab }}
          </div>
        </div>
      </div>
    </div>

    <div class="products">
      <div v-for="n in 6" :key="n" class="single-product">
        <div class="img-container">
          <img  src="../assets/images/1.png" alt="">
          <div class="sale">
            -50%
          </div>

          <div class=" product-content">
            <h6 class="name">Header</h6>
            <div class="rating">
              <span class="price">Price</span>
              <div class="icon">
                <img src="../assets/images/rating.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="tab">SEE MORE</button>
  </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px
}

.category-header h3 {
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1rem;
}


.tabs {
  display: flex;
  align-items: center;

}

.tabs button {
  font-weight: 600;
  font-size: 0.7rem;
  line-height: 0.8rem;
  opacity: 0.6;
  margin-right: 2rem; 
  transition: 0.5s;
  cursor: pointer;
}

.tabs button.active {
  opacity: 1;
}
.tabs button:hover
 {
  opacity: 1;
}

.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  gap:30px
}

.single-product .img-container{
  position: relative;
}

.single-product .img-container .sale{
  position: absolute;
  left: 0;
  top:0;
  padding: 8px;
  background: rgb(217, 41, 71);
  right: auto;
  color:white
}

.single-product .product-content{
  padding: 10px 0;
}
.single-product .product-content h6 {
  font-weight: 400;
  font-size: 0.7rem;
  line-height: 1rem;
  opacity: 0.6;
  margin-top: 5px;
}
.single-product .product-content .rating {
  display: flex;
  justify-content: center;
  align-items: center
}

</style>


