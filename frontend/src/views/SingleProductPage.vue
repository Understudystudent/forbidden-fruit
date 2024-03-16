<template>
  <div class="bg-black">
    <div class="row">
      <h1 class="display-2 text-white">Item Details</h1>
    </div>
    <div class="row">
      <div class="col-md-6">
        <!-- Image on the left -->
        <Card v-if="item">
          <template>
            <img :src="item.prodUrl" alt="Item Image" class="card-image bg-black" />
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
      </div>
    </div>
    <button @click="goback" class="btn btn-primary">Go Back</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ItemDetailPage",
  computed: {
    ...mapState(['items']), 
    item() {
      return this.items.find(item => item.id === this.$route.params.itemID);
    }
  },
  methods: {
    goback() {
      this.$router.push({ name: 'MultipleProducts' });
    }
  }
}

</script>

<style scoped>
</style>
