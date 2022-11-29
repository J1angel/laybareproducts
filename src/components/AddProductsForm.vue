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
    <v-snackbars :objects.sync="objects"  top right>
      <template v-slot:default="{ message }">
        <v-layout align-center pr-4>
          <v-icon class="pr-3" dark large>mdi-robot-angry</v-icon>
          {{ message }}
        </v-layout>
      </template>
    </v-snackbars>
    <v-snackbars :objects.sync="objectss"  top right>
      <template v-slot:default="{ message }">
        <v-layout align-center pr-4>
          <v-icon class="pr-3" dark large>mdi-hand-okay</v-icon>
          {{ message }}
        </v-layout>
      </template>
    </v-snackbars>
  </div>
</template>
<script>
import ProductApi from '@/apilinks/productsapi'
import VSnackbars from "v-snackbars";
import {mapActions} from 'vuex';
export default {
  components:{
    "v-snackbars": VSnackbars,
  },
  data(){
    return {
      dialog:false,
      product:{
        name:'',
        description:'',
        price:''
      },
      objects:[],
      objectss:[]
    }
  },
  mounted() {
    this.$root.$on('showDialog', () => {
      this.showDialog()
    })
  },
  methods:{
    ...mapActions({
      setProductsNew: "products/setProductsNew",
    }),
    showDialog(){
      this.dialog = true
    },
    addProduct(){
      ProductApi.addProduct(this.product).then(response => {
        this.objectss.push({
          message: response.data.message,
          color:"green darken-2",
          timeout:3000
        })
        this.setProductsNew()
        this.dialog = false
      }).catch(error => {
        this.objects.push({
          message:error.response.data.message,
          color:"red darken-4",
          timeout:3000
        })
      })
    }
  }
}
</script>
