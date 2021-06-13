import request from "@/request/http"
import {SET_AUDIO_REF, SET_AUDIO_OBJ, SET_PLAYER_SONGS, SET_CURRENT, SET_LRC} from "./constant"
export default {
    state: () => {
        return {
            audioObj: {
                audioRef: null,
                playStatus: false,
                currentRate: 0,
                name: "",
                al: "",
                dt: 0,
                playMode: 1,
                speed: 1,
            },
            // 存在歌曲列表
            songs: [],
            speed: 1,
            currentIndex: -1,
            lrc: {
                lyric: "",
                version: 0
            }
        }
    },
    mutations: {
        [SET_AUDIO_REF](state, payload){
            state.audioObj.audioRef = payload.data
        },
        [SET_AUDIO_OBJ](state, payload){
            state.audioObj = {
                ...state.audioObj,
                ...payload.data
            }
        },
        [SET_PLAYER_SONGS](state, payload){
            state.songs = payload.data
        },
        [SET_CURRENT](state, payload){
            state.currentIndex = payload.data.currentIndex
        },
        [SET_LRC](state, payload){
          state.lrc = payload
        }
    },
    actions: {
        async getPlayingLyric({commit}, payload){
            let result = await request({
                url: "/api/lyric",
                params: {
                    id: payload.id,
                },
                method: "GET"
            })
            commit(SET_LRC, result.lrc)
        }
    },
    getters: {
        audioObj: (state) => {
            return state.audioObj
        },
        songs: (state) => {
            return state.songs
        },
        lyric: (state) => {
            return state.lrc.lyric
        },
        speed: (state) => {
            return state.speed
        }
    },
    namespaced: true
}