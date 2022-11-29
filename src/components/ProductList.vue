<template>
  <div>
  <v-simple-table width="100%">
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Product ID
        </th>
        <th class="text-left">
          Product Name
        </th>
        <th class="text-left">
          Description
        </th>
        <th class="text-left">
          Price
        </th>
        <th class="text-left">
          Actions
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in products"
          :key="item.name"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td><v-btn icon><v-icon @click="showEditProduct(item)">mdi-pencil</v-icon></v-btn>
          <popper
              trigger="clickToOpen"
              :options="{
                  placement: 'top',
                  modifiers: { offset: { offset: '0,10px' } }
                }">
            <div class="popper">
              <v-sheet
                  color="grey lighten-5"
                  height="75"
                  width="200"
              >
                <div style="font-size: 12px; line-height: 1.2em;"> </div>
                <div style="font-size: 12px; line-height: 1.2em;">Are you sure you want to delete this item?</div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn  color="teal lighten-1" @click="deleteProduct({id:item.id})" small>OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>

              </v-sheet>
            </div>
            <v-icon slot="reference" color="red">
              mdi-delete
            </v-icon>
          </popper></td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
  <UpdateProductForm :product="product"></UpdateProductForm>
  </div>
</template>
<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
import UpdateProductForm from "@/components/UpdateProductForm";
import ProductApi from '@/apilinks/productsapi';
export default {
  props:['products'],
  components:{
    UpdateProductForm,
    "popper": Popper,
  },
  data(){
    return{
      product:[]
    }
  },
  methods:{
    showEditProduct(item){
      this.product = item
      this.$root.$emit('showEditDialog')
    },
    deleteProduct(item){
      ProductApi.deleteProduct(item).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
