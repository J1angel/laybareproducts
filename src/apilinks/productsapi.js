import Api from '@/axios';
import store from "@/store";

export default {
    addProduct(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authUser.token}`;
        return Api().post('/auth/addproduct', data)
    },
    getProducts(){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authUser.token}`;
        return Api().get('/auth/products')
    },
    editProduct(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authUser.token}`;
        return Api().put(`/auth/products/${data.id}`, data)
    },
    deleteProduct(item) {
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authUser.token}`;
        return Api().post('/auth/deleteproduct/', item)
    }
}
