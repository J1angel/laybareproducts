<template>
  <div>
    <v-dialog
        v-model="dialog"
        max-width="800"
    >
      <v-card
      >
        <v-card-title>Edit Product</v-card-title>
        <v-card-text >
          <v-text-field v-model="prod.name" label="Name" type="text" outlined>
          </v-text-field>
          <v-text-field v-model="prod.description" label="Description" type="text" outlined>
          </v-text-field>
          <v-text-field v-model="prod.price" label="Price" type="number" outlined>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" dark @click="updateProduct">UPDATE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProductApi from '@/apilinks/productsapi'
export default {
  props:['product'],
  data(){
    return {
      dialog:false,
      prod:this.product
    }
  },
  mounted() {
    this.$root.$on('showEditDialog', () => {
      this.showDialog()
    })
  },
  methods:{
    showDialog(){
      this.dialog = true
    },
    updateProduct(){
     ProductApi.editProduct(this.prod).then(response => {
        console.log(response)
        this.dialog = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
