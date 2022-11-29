<template>
  <div>
    <v-dialog
        v-model="dialog"
        max-width="800"
    >
      <v-card
      >
        <v-card-title>Add Product</v-card-title>
      <v-card-text>

        <v-text-field v-model="product.name" label="Name" type="text" outlined>
        </v-text-field>
        <v-text-field v-model="product.description" label="Description" type="text" outlined>
        </v-text-field>
        <v-text-field v-model="product.price" label="Price" type="number" outlined>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" dark @click="addProduct">ADD</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProductApi from '@/apilinks/productsapi'
export default {
  data(){
    return {
      dialog:false,
      product:{
        name:'',
        description:'',
        price:''
      }
    }
  },
  mounted() {
    this.$root.$on('showDialog', () => {
      this.showDialog()
    })
  },
  methods:{
    showDialog(){
      this.dialog = true
    },
    addProduct(){
      ProductApi.addProduct(this.product).then(response => {
        console.log(response)
        this.dialog = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
