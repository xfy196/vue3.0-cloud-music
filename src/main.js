import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store"
import "./utils/autoflex"
createApp(App).use(router).use(store).mount('#app')