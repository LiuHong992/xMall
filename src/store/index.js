import Vue from 'vue'
import Vuex from 'vuex'
import mainIndex from './MainIndex'
import goods from './Goods'
import $api from '../http/api'
import { Message } from 'element-ui'

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
                commit('setCartsSum', sum)
                commit('setCartsNum', num)
            } else {
                commit('setGoodsList', [])
                commit('setCartsSum', 0)
                commit('setCartsNum', 0)
            }
        },
        // 加入购物车
        async addCart({ commit, dispatch }, { productId, count }) {
            let res = await $api.addCart({ productId, count })
            if (res.code === 200) {
                Message.success(res.msg)
                dispatch('getCart')
            } else {
                Message.error('加入购物车失败')
            }
        },
        // 删除购物车内商品
        async deleteCart({ commit, dispatch }, { productId }) {
            let res = await $api.delCart({ productId })
            if (res.code === 200) {
                Message.success(res.msg)
                dispatch('getCart')
            } else {
                Message.error('删除商品失败~')
            }
        },
    },
    modules: {
        mainIndex,
        goods
    }
})