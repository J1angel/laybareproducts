import VueRouter from 'vue-router';
import LoginPage from '@/Views/LoginPage'
import RegisterPage from '@/Views/RegisterPage'
import HomePage from '@/Views/HomePage'
import store from "@/store";
import Vue from "vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: LoginPage,
        name: 'LoginPage',
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'RegisterPage',
    },
    {
        path: '/homepage',
        component: HomePage,
        name: 'HomePage',
        beforeEnter: (to, from, next) => {
            if (store.state.authUser.is_authenticated && store.state.authUser.is_authenticated){
                next()
            }else{
                router.push('/')
            }
        }
    },
]
const router = new VueRouter({
    mode: 'history',
    routes: routes
})



export default router
