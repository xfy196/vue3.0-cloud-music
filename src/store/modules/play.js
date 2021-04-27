import request from "@/request/http"
import {SET_AUDIO_REF, SET_AUDIO_OBJ, SET_PLAYER_SONGS} from "./constant"
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
            songs: []
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
        }
    },
    actions: {

    },
    getters: {
        audioObj: (state) => {
            return state.audioObj
        },
        songs: (state) => {
            return state.songs
        }
    },
    namespaced: true
}