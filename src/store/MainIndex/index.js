// 默认导出一个对象既一个模块
import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    // 需要命名空间
    namespaced: true,
    state: {
        // 接收轮播图数据的d对象
        bannerObj: {},
        // 接收活动板块数据的对象
        activityObj: {},
        // 接收热门商品数据的对象
        hotgoodsObj: {},
        // 接收官方精选数据的对象
        choiceObj: {},
        // 接收热门周边数据的对象
        hotnearObj: {},
        // 接收品牌精选数据的对象
        concentrationObj: {},
        // 接收活动板块2数据的对象
        activetwoObj: {}
    },
    mutations: {
        // state数据里的赋值操作
        setBanner(state, data) {
            state.bannerObj = data
        },
        setActivity(state, data) {
            state.activityObj = data
        },
        setHot(state, data) {
            state.hotgoodsObj = data
        },
        setChoice(state, data) {
            state.choiceObj = data
        },
        setHotnear(state, data) {
            state.hotnearObj = data
        },
        setConcentration(state, data) {
            state.concentrationObj = data
        },
        setActivetwo(state, data) {
            state.activetwoObj = data
        },
    },
    getters: {

    },
    actions: {
        // 获取首页数据
        async getHomeData({ commit, dispatch }) {
            let res = await api.getHome()
            if (res.code === 200) {
                commit('setBanner', res.data[0])
                commit('setActivity', res.data[1])
                commit('setHot', res.data[2])
                commit('setChoice', res.data[3])
                commit('setHotnear', res.data[4])
                commit('setConcentration', res.data[5])
                commit('setActivetwo', res.data[6])
                console.log(res);
            }
        },
    },
}