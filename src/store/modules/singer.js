import request from "@/request/http"
import {GET_SINGER_SONGS, SET_SINGER_SONGS} from "./constant"
export default {
    state: () => {
        return {
            songs: []
        }
    },
    mutations: {
        [SET_SINGER_SONGS](state, payload){
            state.songs = payload
        }
    },
    actions: {
        async [GET_SINGER_SONGS]({commit}, payload){
            let id = payload.id
            // 请求数据
            let result = await request({
                url: "/api/artist/top/song?id=" + id
            })
            if(result.code == 200){
                commit(SET_SINGER_SONGS, result.songs)
            }
        }
    },
    getters: {
        getSongs: (state) => {
            return state.songs
        }
    },
    namespaced: true
}