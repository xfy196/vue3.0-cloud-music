import {createStore} from "vuex"
import recommend from "./modules/recommend"
import singers from "./modules/singers"
import rank from "./modules/rank"
import search from "./modules/search"
const store = createStore({
    state(){
        return{
            num: 1,
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
        search
    }
})

export default store