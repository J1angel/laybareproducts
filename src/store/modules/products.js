import ProductApi from '@/apilinks/productsapi'

const getDefaultState = () => {
    return {
        products:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    }
}
export const products = {
    namespaced: true,
    state: {
        products:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    },

    getters:{
        current_products(state){
            return state.products
        },
        page(state){
            return state.page
        },
        last_page(state){
            return state.last_page
        },
        current_url(state){
            return state.current_url
        },
        prev_url(state){
            return state.prev_url
        }
    },

    mutations:{
        SET_PRODUCTS(state, value) {
            state.products.push(...value)
        },
        SET_PRODUCTS_NEW(state, value){
            state.products = value
        },
        SET_PAGE(state, value){
            state.page = value
        },
        SET_LASTPAGE(state, value){
            state.last_page = value
        },
        SET_CURRENTURL(state, value){
            state.current_url = value
        },
        SET_PREVURL(state, value){
            state.prev_url = value
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    },

    actions:{
        setProducts({commit, state}){
            ProductApi.getProducts(state.products.page).then(response => {
                commit("SET_PRODUCTS", response.data.data)
            }).catch(error => {
                console.log(error)
            })

        },
        setProductsNew({commit}){
            ProductApi.getProducts().then(response => {
                console.log(response)
                commit("SET_PRODUCTS_NEW", response.data.data)
                commit("SET_LASTPAGE", response.data.last_page)
            }).catch(error => {
                console.log(error)
            })

        },
        changepage({commit}){
            let a = this.state.products.page + 1
            commit('SET_PAGE', a)
        },
        resetState({commit}){
            commit('resetState')
        }
    }

}

export default products
