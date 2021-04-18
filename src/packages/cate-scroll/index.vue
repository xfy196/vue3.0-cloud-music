<template>
  <HorizontalScroll>
    <div id="scrollWrapper" :ref="horizontalWrapperRef">
      <slot></slot>
    </div>
  </HorizontalScroll>
</template>

<script>
import { HorizontalScroll } from "./style";
import { reactive, onMounted, nextTick } from "vue";
import BScroll from "better-scroll";
export default {
  name: "cate-scroll",
  components: {
    HorizontalScroll,
  },
  setup() {
    const state = reactive({
      horizontalWrapperRef: null,
      bsScroll: null,
    });
    const horizontalWrapperRef = (el) => {
      if (el) {
        state.horizontalWrapperRef = el;
      }
    };
    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          if (state.bsScroll) {
            console.log(state.bsScroll)
            state.bsScroll.refresh();
          } else {
            state.bsScroll = new BScroll(state.horizontalWrapperRef, {
              scrollX: true,
              bounce: true,
              startX: 0,
              probeType: 3,
              eventPassthrough: "vertical",
            });
          }
        }, 0)
      });
    });
    return {
      horizontalWrapperRef,
    };
  },
};
</script>

<style>
</style>