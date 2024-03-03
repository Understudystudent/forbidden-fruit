<template>
  <div>
    <BannerHome/>
    <CategoryProducts
      :tabs="womentabs"
      :title="womentitle"
      :products="womenProducts"
    />
  </div>
</template>

<script setup>

import BannerHome from "../components/BannerHome.vue";
import CategoryProducts from "../components/CategoryProducts.vue";
import { ref } from 'vue'; 


const womentabs = ref([
  "NEW ARRIVALS",
  "SPECIALS",
  "BESTSELLERS",
  "MOST VIEWED",
  "FEATURED PRODUCTS",
]);

const womenProducts = ref([
  {
    img: "../assets/images/p1.jpg",
    sale: false,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
  {
    img: "../assets/images/p2.png",
    sale: true,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
  {
    img: "../assets/images/p3.png",
    sale: false,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
  {
    img: "../assets/images/p2.png",
    sale: false,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
  {
    img: "../assets/images/p3.png",
    sale: false,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
  {
    img: "../assets/images/p1.jpg",
    sale: false,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
  {
    img: "../assets/images/p3.png",
    sale: false,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
  {
    img: "../assets/images/p2.png",
    sale: false,
    name: `Women's tracksuit Q109`,
    price: "$ 38.00",
    rating: "../assets/images/rating.png",
  },
]);
const womentitle = ref("Womens");


</script>
