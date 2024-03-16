<template>
    <div class="modal fade" id="editProductAdmin" tabindex="-1" role="dialog" aria-labelledby="editProductAdminLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductAdminLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="form-group">
                <label for="editProductID">Product ID</label>
                <input type="text" class="form-control" id="editProductID" v-model="editedProduct.itemID" readonly>
              </div>
              <div class="form-group">
                <label for="editProductName">Product Name</label>
                <input type="text" class="form-control" id="editProductName" v-model="editedProduct.itemName">
              </div>
              <div class="form-group">
                <label for="editProductQuantity">Quantity</label>
                <input type="number" class="form-control" id="editProductQuantity" v-model="editedProduct.itemQuantity">
              </div>
              <div class="form-group">
                <label for="editProductAmount">Amount</label>
                <input type="number" class="form-control" id="editProductAmount" v-model="editedProduct.itemAmount">
              </div>
              <div class="form-group">
                <label for="editProductUrl">URL</label>
                <input type="text" class="form-control" id="editProductUrl" v-model="editedProduct.itemUrl">
              </div>
              <div class="form-group">
                <label for="editProductCategory">Category</label>
                <input type="text" class="form-control" id="editProductCategory" v-model="editedProduct.Category">
              </div>
              <div class="form-group">
                <label for="editProductDescription">Description</label>
                <textarea class="form-control" id="editProductDescription" rows="3" v-model="editedProduct.itemDescription"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Update Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      editedProduct: {
        itemID: '',
        itemName: '',
        itemQuantity: 0,
        itemAmount: 0,
        itemUrl: '',
        Category: '',
        itemDescription: ''
      },
      showEditModal: false 
    };
  },
  methods: {
    updateProduct() {
      this.$store.dispatch('updateProduct', this.editedProduct)
        .then(() => {
          this.showEditModal = false;
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    }
  }
};
</script>

  <style scoped>
  </style>
  