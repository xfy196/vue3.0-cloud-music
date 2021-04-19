import {GET_RANK_DETAIL, SET_LOADING} from "./constant"
import request from "@/request/http"
export default {
    state: () => {
        return {
            detail: {
                list: []
            },
            loading: true
        }
    },
    mutations: {
        [GET_RANK_DETAIL](state, payload){
            state.detail = payload
            delete state.detail.code
        },
        [SET_LOADING](state, payload){
            state.loading = payload
        }
    },
    actions: {
        async [GET_RANK_DETAIL]({commit}, payload){
           let result = await request({
                url: "/api/toplist/detail",
                method: "GET"
            })
            commit(SET_LOADING, false)
            if(result.code == 200){
                commit(GET_RANK_DETAIL, result)
            }
        }
    },
    namespaced: true
}