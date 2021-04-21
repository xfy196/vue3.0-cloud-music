<template>
    <SearchContainerStyled>
        <transition @enter="handleAnimateEnter" appear="animate__animated animate__fadeInRight" enter-active-class="animate__animated animate__fadeInRight" duration="300">
            <div class="searchContainer">
                <div class="header">
                    <van-icon color="#fff" @click="handleBack" name="arrow-left" />
                    <van-search :background="state.themeColor" autofocus shape="round" class="searchInput" v-model="state.keywords" placeholder="搜索歌曲、歌手、专辑" />
                </div>
                <div class="content">
                <!-- 热门搜索 -->
                <div class="hotContainer" v-if="true">
                    <div class="headTitle">热门搜索</div>
                    <ul class="hotList">
                        <li class="hotItem border" @click="handleHotItemClick(item)" v-for="(item, index) in hots" :key="index"><span>{{item.first}}</span></li>
                    </ul>
                </div>
                <!-- 搜索的歌曲列表 -->
                <ScrollCom v-else @initRequest="handelScrollCallback" :loading="false">
                    <slot>
                        <div class="searchListWrapper">
                            dasdad
                        </div>
                    </slot>
                </ScrollCom>
                </div>
            </div>
        </transition>
    </SearchContainerStyled>
</template>

<script>
import {SearchContainerStyled} from "./style"
import {reactive, onMounted, onBeforeMount, computed} from "vue"
import globalStyle from "@/assets/global-style"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import {GET_HOTS} from "@/store/modules/constant"
import Loading from "@/baseUI/loading/index.vue"
import ScrollCom from "@/packages/scroll/index.vue"
export default {
    components: {
        SearchContainerStyled,
        Loading,
        ScrollCom
    },
    setup(){
        const router = useRouter()
        const store = useStore()
        const state = reactive({
            show: false,
            keywords: "",
            themeColor: globalStyle["theme-color"]
        })
        onBeforeMount(async () => {
            await store.dispatch({
                type: 'search/' + GET_HOTS,
            })
        })
        onMounted(() => {
        })
        const hots = computed(() => store.state.search.hots)
        /**
         * 动画进场
         */
        function handleAnimateEnter(){
            state.show = true
        }
        /**
         * 返回
         */
        function handleBack(){
            router.go(-1)
        }
        /**
         * 点击热门搜索
         */
        function handleHotItemClick(item){

        }
        function handelScrollCallback(fn){
            fn && fn(false)
        }
        return {
            state,
            handleAnimateEnter,
            handleBack,
            hots,
            handleHotItemClick,
            handelScrollCallback
        }
    }
}
</script>

<style>

</style>