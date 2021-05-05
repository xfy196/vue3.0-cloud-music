import {createStore} from "vuex"
import recommend from "./modules/recommend"
import singers from "./modules/singers"
import rank from "./modules/rank"
import search from "./modules/search"
import alDetail from "./modules/alDetail"
import play from "./modules/play"
import singer from "./modules/singer"
import {SET_SHOW_PLAYER} from "./modules/constant"
const store = createStore({
    state(){
        return{
            playSwitch: false,
        }
    },
    mutations: {
        [SET_SHOW_PLAYER](state, payload){
            state.playSwitch = payload.data
        }
    },
    actions: {

    },
    modules: {
        recommend,
        singers,
        rank,
        search,
        alDetail,
        play,
        singer
    }
})

export default store