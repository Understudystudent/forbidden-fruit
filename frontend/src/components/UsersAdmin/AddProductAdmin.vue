<template>
    <div>
        <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo">Product</button>
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content modal-custom">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel1">Add a Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addData" class="d-flex flex-column gap-3">
                            <!-- <input type="text" v-model="addItem.itemID" placeholder="ID" required class="form-control mb-3"> -->
                            <input type="text" v-model="addItem.itemName" placeholder="Name" required class="form-control mb-3">
                            <input type="text" v-model="addItem.itemDescription" placeholder="Description" required class="form-control mb-3">
                            <input type="text" v-model="addItem.Category" placeholder="Category" required class="form-control mb-3">
                            <input type="number" v-model="addItem.itemAmount" placeholder="Price (ZAR)" required class="form-control mb-3">
                            <input type="text" v-model="addItem.itemUrl" placeholder="Image URL" class="form-control mb-3">
                            <button type="submit" class="btn btn-danger btn-block">Add</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      addItem: {
        itemName: "",
        itemDescription: "",
        itemQuantity: "", 
        itemAmount: "",
        itemUrl: "",
        Category: "" 
      }
    };
  },
  methods: {
    addData() {
      this.$store.dispatch('addItem', this.addItem);
      this.clearForm();
    },
    clearForm() {
      this.addItem = {
        itemName: "",
        itemDescription: "",
        itemQuantity: "", 
        itemAmount: "",
        itemUrl: "",
        Category: "" 
      };
    }
  }
};
</script>


<style scoped>
.modal-custom {
    background-color: #212121; 
    color: #FF5722;
    border-radius: 20px; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 
}

.modal-header {
    border-bottom: 2px solid #FF5722; 
}

.form-control {
    background-color: #424242;
    border: 2px solid #FF5722; 
    color: #FF5722;
}

.btn {
    background-color: #212121; 
    color: #FF5722; 
    border: 2px solid #FF5722; 
    border-radius: 20px; 
}

.btn:hover {
    background-color: #FF5722; 
    color: #212121;
}
</style>
