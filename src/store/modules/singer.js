import request from "@/request/http"
import {GET_SINGER_SONGS, SET_SINGER_SONGS} from "./constant"
export default {
    state: () => {
        return {
            songs: {
                artist: {},
                more: true,
                hotSongs: []
            }
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
                url: "/api/artists?id=" + id
            })
            if(result.code == 200){
                delete result.code
                commit(SET_SINGER_SONGS, result)
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