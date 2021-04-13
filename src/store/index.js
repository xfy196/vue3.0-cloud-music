import {createStore} from "vuex"
import recommend from "./modules/recommend"
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
        recommend
    }
})

export default store