import {createWebHashHistory, createRouter} from "vue-router"
const history = createWebHashHistory()
const router = createRouter({
    history,
    routes: [
        {
            path: "/",
            component: import("../layouts/BlankLayouts.vue"),
            children: [
                {
                    path: "/",
                    component: import("../layouts/HomeLayouts.vue"),
                }
            ]
        }
    ]
})
router.afterEach(() => {
})
export default router;