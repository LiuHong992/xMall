// 默认导出一个对象既一个模块
import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    // 需要命名空间
    namespaced: true,
    state: {
        // 接收请求出来的数据
        allDataArr: [],
        // 商品总件数
        total: null
    },
    mutations: {
        // state数据里的赋值操作
        setallDataArr(state, data) {
            state.allDataArr = data
        },
        setTotal(state, data) {
            state.total = data
        },
    },
    getters: {

    },
    actions: {
        // 获取全部商品数据
        async getGoodsData({ commit, dispatch }, { page, size, sort, priceGt, priceLte }) {
            let res = await api.GetallGoods({ page, size, sort, priceGt, priceLte })
            if (res.code === 200) {
                console.log(res);
                commit('setallDataArr', res.data)
                if (priceGt === 0 && priceLte === 99999) {
                    commit('setTotal', res.total)
                } else {
                    commit('setTotal', res.data.length)
                }
                // commit('setHot', res.data[2])
                // commit('setChoice', res.data[3])
                // commit('setHotnear', res.data[4])
                // commit('setConcentration', res.data[5])
                // commit('setActivetwo', res.data[6])
            }
        },
    },
}