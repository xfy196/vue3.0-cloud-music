<template>
<van-swipe class="swipeContainer" :indicator-color="state.themeColor" :autoplay="3000">
  <van-swipe-item v-for="(item, index) in banners" :key="index">
    <img style="height: 100%; width: 100%" v-lazy="item.imageUrl" />
  </van-swipe-item>
</van-swipe>
</template>

<script>
import {reactive} from "vue"
import globalStyle from "@/assets/global-style"
export default {
    name: "swiper",
    props: {
        banners: Array
    },
    setup(props, ctx){
      const state = reactive({
        themeColor : globalStyle["theme-color"]
      })
      return {
        state
      }
    }
}
</script>

<style>

</style>