import request from "@/request/http"
import { GET_DETAIL, SET_DETAIL, SET_SONGS }from "./constant"
export default {
    state: () => {
        return {
            detail: {},
            songs: {}
        }
    },
    mutations: {
        [SET_DETAIL](state, payload){
            state.detail = payload
        },
        [SET_SONGS](state, payload){
            state.songs = payload
        }
    },
    actions: {
        async [GET_DETAIL]({commit}, payload){
           let result = await request({
                url: "/api/playlist/detail",
                params: {
                    id: payload.id
                }
            })
            if(result.code == 200){
                // 再次拿到ids请求该歌单里的歌曲
                const trackIds = result.playlist.trackIds;
                let trackIdsStr = trackIds.reduce((accumulator, currentValue, index, array) => {
                    return accumulator + currentValue.id + (index === array.length -1 ? "" : ",")
                }, "")
                let resultSongs = await request({
                    url: "/api/song/detail",
                    params: {
                        ids: trackIdsStr
                    }
                })
                if(resultSongs.code == 200){
                    delete resultSongs.code
                    commit(SET_SONGS, resultSongs)
                }
                delete result.code
                commit(SET_DETAIL, result)

            }
        }
    },
    getters: {
        detail: (state) => state.detail,
        songs: (state) => state.songs 
    },
    namespaced: true
}