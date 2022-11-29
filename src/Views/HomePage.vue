<template>
  <div>
    <v-card height="1000px">
      <v-card-text>
        <v-btn color="green" dark class="float-right" @click="addProduct">CREATE</v-btn>
      </v-card-text>
      <v-card-text>
        <ProductList :products="products"/>
        <div v-observe-visibility="handleScrolledToBottom"></div>
      </v-card-text>

    </v-card>
    <AddProductsForm></AddProductsForm>
  </div>
</template>
<script>
import ProductList from '@/components/ProductList';
import AddProductsForm from '@/components/AddProductsForm';
import {mapActions} from 'vuex';
import {get} from 'vuex-pathify';
export default {
  components:{
    AddProductsForm,
    ProductList
  },

  created() {
    this.setProductsNew()
  },
  computed:{
    page:get('products/page'),
    last_page:get('products/last_page'),
    products:get('products/products')
  },
  methods:{
    ...mapActions({
      setProductsNew: "products/setProductsNew",
      setProducts:"products/setProducts",
      setPage:"products/changepage"
    }),
    addProduct(){
      this.$root.$emit('showDialog')
    },
    handleScrolledToBottom(isVisible){
      if (isVisible){
        if (this.page < this.last_page){
          this.setPage()
          this.setProducts()
        }
      }
    },

  }
}
</script>
