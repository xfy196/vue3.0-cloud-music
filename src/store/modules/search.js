import {GET_HOTS} from "./constant"
import request from "@/request/http"
export default {
    state: () => {
        return {
            hots: []
        }
    },
    mutations: {
        [GET_HOTS](state, payload){
            state.hots = payload.hots
        }
    },
    actions: {
        async [GET_HOTS]({commit}){
            let result = await request({
                url: "/api/search/hot",
                method: "GET"
            })
            if(result.code == 200){
                commit(GET_HOTS, result.result)
            }
        }
    },
    getters: {

    },
    namespaced: true
}