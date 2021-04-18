import {createStore} from "vuex"
import recommend from "./modules/recommend"
import singers from "./modules/singers"
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
        singers
    }
})

export default store