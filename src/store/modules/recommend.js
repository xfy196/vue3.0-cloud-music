import {GET_BANNERS} from "./constant"
import request from "@/request/http"
export default {
    state: () => {
        return {
            banners: [],
            loading: true
        }
    },
    mutations: {
        async [GET_BANNERS](state){
           let result = await request({
                url: "/api/banner",
                method: "GET",
            })
            state.loading = false
            if(result.code == 200){
                state.banners = result.banners
            }
        }
    },
    actions: {
        [GET_BANNERS]({commit}){
            commit(GET_BANNERS)
        }
    },
    getters: {

    },
    namespaced: true
}