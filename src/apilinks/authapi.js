import Api from '@/axios';
import store from "@/store";

export default {
    registerUser(data){
        return Api().post('/auth/register', data)
    },
    loginUser(data){
        return Api().post('/auth/login', data)
    },
    user(){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authUser.token}`;
        return Api().post('/auth/me',{})
    }
}
