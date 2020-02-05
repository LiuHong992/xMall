import Vue from 'vue'
import Vuex from 'vuex'
import $api from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartsNum: 0
    },
    mutations: {},
    actions: {
        getCart() {
            this.$api.getCarts().then(res => {
                if (res.code === 200) {
                    console.log(res);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    modules: {}
})