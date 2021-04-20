<template>
    <SearchContainerStyled>
        <transition @enter="handleAnimateEnter" appear="animate__animated animate__fadeInRight" enter-active-class="animate__animated animate__fadeInRight" duration="300">
            <div class="searchContainer">
                <div class="header">
                    <van-icon color="#fff" @click="handleBack" name="arrow-left" />
                    <van-search :background="state.themeColor" autofocus show-action shape="round" class="searchInput" v-model="state.keywords" placeholder="搜索歌曲、歌手、专辑" />
                </div>
                <!-- 热门搜索 -->
                <!-- 搜索的歌曲列表 -->
            </div>
        </transition>
    </SearchContainerStyled>
</template>

<script>
import {SearchContainerStyled} from "./style"
import {reactive, onMounted} from "vue"
import globalStyle from "@/assets/global-style"
import {useRouter} from "vue-router"
export default {
    components: {
        SearchContainerStyled
    },
    setup(){
        const router = useRouter()
        const state = reactive({
            show: false,
            keywords: "",
            themeColor: globalStyle["theme-color"]
        })
        onMounted(() => {
        })
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
        return {
            state,
            handleAnimateEnter,
            handleBack
        }
    }
}
</script>

<style>

</style>