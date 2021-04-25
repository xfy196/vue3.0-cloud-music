import {createStore} from "vuex"
import recommend from "./modules/recommend"
import singers from "./modules/singers"
import rank from "./modules/rank"
import search from "./modules/search"
import alDetail from "./modules/alDetail"
const store = createStore({
    state(){
        return{
        }
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        recommend,
        singers,
        rank,
        search,
        alDetail
    }
})

export default store