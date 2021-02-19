import {createWebHashHistory, createRouter} from "vue-router"
const history = createWebHashHistory()
const router = createRouter({
    history,
    routes: [
        {
            path: "/",
            component: import("../components/HelloWorld.vue")
        }
    ]
})
router.afterEach(() => {
})
export default router;