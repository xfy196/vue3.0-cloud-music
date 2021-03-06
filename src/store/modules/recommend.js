import {GET_BANNERS, GET_RECOMMEND_LIST, SET_LOADING} from "./constant"
import request from "@/request/http"
export default {
    state: () => {
        return {
            banners: [],
            loading: true,
            recommendList: []
        }
    },
    mutations: {
        [GET_BANNERS](state, banners){
            state.banners = banners
        },
        [GET_RECOMMEND_LIST](state, recommendList){
            state.loading = false
            state.recommendList = recommendList
        },
        [SET_LOADING](state, payload){
            state.loading = payload
        }
    },
    actions: {
        async [GET_BANNERS]({commit}){
            let result = await request({
                url: "/api/banner",
                method: "GET",
            })
            if(result.code == 200){
                commit(GET_BANNERS, result.banners)
            }
        },
        async [GET_RECOMMEND_LIST]({commit}){
            let result = await request({
                url: "/api/personalized",
                method: "GET"
            })
            if(result.code == 200){
                commit(GET_RECOMMEND_LIST, result.result)
            }
        }
    },
    getters: {
        loading : (state) => {
            return state.loading
        }
    },
    namespaced: true
}