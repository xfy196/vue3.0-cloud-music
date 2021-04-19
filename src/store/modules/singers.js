import request from "@/request/http"
import {GET_SINGERS, SET_LOADING, SET_FINISHED} from "./constant"
export default {
    state: () =>{
        return {
            singers: [],
            more: true,
            loading: true,
        }
    },
    mutations: {
        [GET_SINGERS](state, data){
            if(data.searchData.offset <= 0){
                state.singers = data.result.artists
            }else {
                state.singers.push(...data.result.artists)
            }
            state.more = data.result.more
        },
        [SET_LOADING](state, data){
            state.loading = data
        },
        [SET_FINISHED](state,data){
            state.finished = data
        }
    },
    actions: {
        async [GET_SINGERS]({commit}, payload){
            let result = await request({
                url:"/api/artist/list",
                method: "GET",
                params: payload.data
            })
            commit(SET_LOADING, false)
            commit(SET_FINISHED, true)
            if(result.code){
                commit(GET_SINGERS, {
                    result,
                    searchData: payload.data
                })
            }
        }
    },
    getters: {
        getSingers: (state) => {
            return state.singers
        },
        getLoading: (state) => {
            return state.loading
        },
        getFinished: (state) => {
            return state.finished
        }
    },
    namespaced: true
}