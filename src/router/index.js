import {createRouter, createWebHistory} from "vue-router"
const history = createWebHistory()
const router = createRouter({
    history,
    routes: [
        {
            path: "/",
            component: () => import("../layouts/BlankLayouts.vue"),
            children: [
                {
                    path: "/",
                    component: () => import("../layouts/HomeLayouts.vue"),
                    children: [
                        {
                            path: "/recommend",
                            component: () => import("../page/recommend.vue"),
                            name: "recommend",
                            children: [
                                
                            ]
                        },
                        {
                            path: "/",
                            redirect: "/recommend",
                        },
                        {
                            path: "/singers",
                            component: () => import("../page/singers.vue"),
                            name: "singers",
                        },
                        {
                            path: "/rank",
                            component: () => import("../page/rank.vue"),
                            name: "rank"
                        }
                    ]
                },
                {
                    path: "/search",
                    component: () => import("../page/search.vue"),
                    name: "search"
                },
                {
                    path: "/recommend/:id",
                    name: "recommendList",
                    component: () => import("../page/alDetail.vue")
                },
                {
                    path: "/rank/:id",
                    name: "rankList",
                    component: () => import("../page/alDetail.vue")
                }
            ],
        },
    ]
})
router.afterEach(() => {
})
export default router;