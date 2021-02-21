import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store"
import "./utils/autoflex"
import "normalize.css"
import "./assets/css/base.css"
import "./assets/iconfont/iconfont.css"
import vant from "vant"
import "vant/lib/index.css"
const app = createApp(App).use(router).use(store).use(vant).mount('#app')