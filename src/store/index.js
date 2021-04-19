import {createStore} from "vuex"
import recommend from "./modules/recommend"
import singers from "./modules/singers"
import rank from "./modules/rank"
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
        rank
    }
})

export default store