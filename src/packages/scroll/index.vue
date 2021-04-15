<template>
<ScrollContainer>
    <div id="scrollWrapper" :ref="getScrollRef">
        <slot></slot>
    </div>
</ScrollContainer>
</template>

<script>
import {ScrollContainer} from "./index"
import {reactive, onMounted, watch, nextTick, onUpdated} from "vue"
import BScroll from "better-scroll"
import { START_LOCATION } from 'vue-router'
export default {
    name: "Scroll",
    components: {
        ScrollContainer
    },
    props: {
        loading: {
            type: Boolean
        }
    },
    setup(props, ctx){
        const state = reactive({
            scrollRef: null,
            bsScroll: null
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
                pullDownRefresh: true
            })
            state.bsScroll.on("pullingDown", async () => {
                // 调用外面的刷新方法
                ctx.emit("initRequest", (val) => {
                    if(!val){
                        state.bsScroll.finishPullDown()
                    }
                })
            })
        })
        onUpdated(() => {
            state.bsScroll.refresh()
        })
        return {
            getScrollRef,
            ...state
        }
    }
}
</script>

<style>

</style>