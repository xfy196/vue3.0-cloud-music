<template>
<van-swipe class="swipeContainer" :indicator-color="state.themeColor" :autoplay="3000">
  <van-swipe-item v-for="(item, index) in banners" :key="index">
    <img style="height: 100%; width: 100%" :src="item.imageUrl" />
  </van-swipe-item>
</van-swipe>
</template>

<script>
import {reactive, inject} from "vue"
export default {
    name: "swiper",
    props: {
        banners: Array
    },
    setup(props, ctx){
      const state = reactive({
        themeColor: inject("themeColor"),
      })
      return {
        state
      }
    }
}
</script>

<style>

</style>