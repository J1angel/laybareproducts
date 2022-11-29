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
import {mapActions} from 'vuex';
import VSnackbars from "v-snackbars";
export default {
  props:['product'],
  components:{
    "v-snackbars": VSnackbars,
  },
  data(){
    return {
      dialog:false,
      prod:this.product,
      objects:[],
      objectss:[]
    }
  },
  mounted() {
    this.$root.$on('showEditDialog', () => {
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
    updateProduct(){
     ProductApi.editProduct(this.prod).then(response => {
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
