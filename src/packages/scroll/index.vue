<template>
<ScrollContainer>
    <div id="scrollWrapper" :ref="getScrollRef">
        <slot></slot>
         <van-loading
        class="loading"
          v-show="loading"
          :color="themeColor"
          :vertical="true"
          type="spinner"
        ></van-loading>
    </div>
</ScrollContainer>
</template>

<script>
import {ScrollContainer} from "./style"
import {reactive, onMounted, onUpdated} from "vue"
import globalStyle from "@/assets/global-style";

import BScroll from "better-scroll"
export default {
    name: "Scroll",
    components: {
        ScrollContainer
    },
    props: {
        loading: {
            type: Boolean
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    setup(props, ctx){
        const state = reactive({
            scrollRef: null,
            bsScroll: null,
            themeColor: globalStyle["theme-color"],

        })
        const getScrollRef = el => {
            if(el){
                state.scrollRef = el
            }
        }
        onMounted(() => {
            state.bsScroll = new BScroll(state.scrollRef, {
                scrollY: true,
                bounce: true,
                probeType: 3,
                pullDownRefresh: true,
                pullUpLoad: props.pullUpLoad
            })
            state.bsScroll.on("pullingDown", async () => {
                // 调用外面的刷新方法
                ctx.emit("initRequest", (val) => {
                    if(!val){
                        state.bsScroll.finishPullDown()
                    }
                })
            })
            props.pullUpLoad && state.bsScroll.on("pullingUp", async() => {
                ctx.emit("pullUpLoad", () => {
                    state.bsScroll.refresh()
                    state.bsScroll.finishPullUp()
                })
            })
        })
        /**
         * 滚动到某一个位置
         */
        function scrollTo(x=0, y=0){
            state.bsScroll.scrollTo(x, y)
        }
        onUpdated(() => {
            state.bsScroll.refresh()
        })
        return {
            getScrollRef,
            ...state,
            scrollTo
        }
    }
}
</script>

<style>

</style>