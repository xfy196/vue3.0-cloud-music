import {GET_HOTS, GET_SEARCH_LIST, SET_SEARCHRESULT, SET_PAGE, GET_SUGGEST, SET_SUGGEST} from "./constant"
import request from "@/request/http"
export default {
    state: () => {
        return {
            hots: [],
            searchResult: {
                hasMore: false,
                songCount: 0,
                songs: [],
            },
            page: 0,
            suggest: {
            }
        }
    },
    mutations: {
        [GET_HOTS](state, payload){
            state.hots = payload.hots
        },
        [GET_SEARCH_LIST](state, payload){
            state.searchResult.hasMore = payload.hasMore
            state.searchResult.songCount = payload.songCount
            if(state.searchResult.songs.length > 0){
                state.searchResult.songs.push(...payload.songs)
            }else {
                state.searchResult.songs = payload.songs
            }
        },
        [SET_SEARCHRESULT](state, payload){
            state.searchResult = payload
        },
        [SET_PAGE](state, payload){
            state.page = payload
        },
        [GET_SUGGEST](state, payload){
            state.suggest = payload
        },
        [SET_SUGGEST](state, payload){
            state.suggest = payload
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
        },
        async [GET_SEARCH_LIST]({commit, state}, payload){
            let result = await request({
                url: "/api/search",
                method: "GET",
                params: {
                    ...payload.data
                }
            })
            if(result.code == 200){
                commit(GET_SEARCH_LIST, result.result)
                commit(SET_PAGE, ++state.page)
            }else {
                commit(GET_SEARCH_LIST, {
                    hasMore: false,
                    songCount: state.searchResult.songCount,
                    songs: []
                })
            }
        },
        async [GET_SUGGEST]({commit, state}, payload){
            let result = await request({
                url: "/api/search/suggest",
                method: "GET",
                params: {
                    ...payload.data
                }
            })
            if(result.code == 200){
                commit(GET_SUGGEST, result.result)
            }
        }
    },
    getters: {
        searchResult: (state) => state.searchResult,
        page: (state) => state.page,
        suggest: (state) => state.suggest
    },
    namespaced: true
}