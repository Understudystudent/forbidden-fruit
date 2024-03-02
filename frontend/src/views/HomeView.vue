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

</script>
