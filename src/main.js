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
const app = createApp(App)
app.use(router)
// 由于vue-router@next版本全部采用 异步方式，为了首屏加载不出现白屏我们需要等待router准备完成之后采取挂载
router.isReady().then(() => {
    app.use(store).use(vant).use(Lazyload).mount('#app')
})