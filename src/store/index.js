import Vue from 'vue'
import Vuex from 'vuex'
import mainIndex from './MainIndex'
import $api from '../http/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 购物车内商品件数
        cartsNum: 0,
        // 购物车总价
        cartsSum: 0,
        // 购物车数组
        goodsList: []
    },
    mutations: {
        setCartsNum(state, data) {
            state.cartsNum = data
        },
        setCartsSum(state, data) {
            state.cartsSum = data
        },
        setGoodsList(state, data) {
            state.goodsList = data
        },
    },
    actions: {
        // 获取购物车数据和购物车下标
        async getCart({ commit, dispatch }) {
            let res = await $api.getCarts()
            if (res.code === 200) {
                commit('setGoodsList', res.data)
                let num = 0;
                let sum = 0;
                res.data.map(item => {
                    num += item.count
                    sum += item.count * item.salePrice
                    item.checked = true
                })
                console.log(res.data);
                console.log(num);
                commit('setCartsSum', sum)
                commit('setCartsNum', num)
            } else {
                commit('setGoodsList', [])
                commit('setCartsSum', 0)
                commit('setCartsNum', 0)
            }
        }
    },
    modules: {
        mainIndex
    }
})