import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store"
import "./utils/autoflex"
import "normalize.css"
import "./assets/css/base.css"
import "./assets/iconfont/iconfont.css"
import "./assets/css/reset.css"
import vant, {Lazyload} from "vant"
import "vant/lib/index.css"
import "./assets/css/border.css"
import fastclick from "fastclick"
import "animate.css"
fastclick.FastClick.attach(document.body);
const app = createApp(App).use(router).use(store).use(vant).use(Lazyload).mount('#app')