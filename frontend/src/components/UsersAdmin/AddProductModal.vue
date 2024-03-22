<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addItem">
                        <input type="text" v-model="formData.itemName" placeholder="Item Name" required />
                        <input type="number" v-model="formData.itemQuantity" placeholder="Item Quantity" required />
                        <input type="number" v-model="formData.itemAmount" placeholder="Item Amount" required />
                        <input type="text" v-model="formData.itemUrl" placeholder="Item URL" />
                        <input type="text" v-model="formData.category" placeholder="Category" required />
                        <textarea v-model="formData.itemDescription" placeholder="Item Description" required></textarea>
                        <button type="submit">Add Item</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        itemName: '',
        itemQuantity: null,
        itemAmount: null,
        itemUrl: '',
        category: '',
        itemDescription: ''
      }
    };
  },
  methods: {
    addItem() {
      const newItem = {
        itemName: this.formData.itemName,
        itemQuantity: this.formData.itemQuantity,
        itemAmount: this.formData.itemAmount,
        itemUrl: this.formData.itemUrl,
        Category: this.formData.category,
        itemDescription: this.formData.itemDescription
      };
      this.$store.dispatch('addItem', newItem);
      this.resetForm();
      this.closeModal();
    },
    resetForm() {
      this.formData.itemName = '';
      this.formData.itemQuantity = null;
      this.formData.itemAmount = null;
      this.formData.itemUrl = '';
      this.formData.category = '';
      this.formData.itemDescription = '';
    },
    closeModal() {
      this.$emit('close');
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
    width: 400px;
    padding: 20px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #FF5722; 
}

.modal-header h3 {
    margin: 0;
}

.modal-header button {
    background: none;
    border: none;
    color: #FF5722;
    cursor: pointer;
}

.modal-body input,
.modal-body textarea {
    margin-bottom: 10px;
    width: 100%;
    padding: 5px;
    border: 2px solid #FF5722;
    border-radius: 5px;
    background-color: #424242;
    color: #FF5722;
}

.modal-body button {
    padding: 10px;
    background-color: #FF5722;
    border: none;
    border-radius: 5px;
    color: #212121;
    cursor: pointer;
    transition: background-color 0.3s;
}

.modal-body button:hover {
    background-color: #FF7043;
}
</style>
