<template>
  <HomeLayoutsWrapper>
    <Top>
      <i class="iconfont menu" @click="handleClickMenu">&#xe65c;</i>
      <span class="title">云音乐</span>
      <router-link to="/search" tag="a">
      <i class="iconfont search">&#xe62b;</i>
      </router-link>
    </Top>
    <HomeLayoutContentWrapper>
      <van-tabs :sticky="true" :background="state.themeColor" title-inactive-color="white" title-active-color="white" color="white" class="tabs" v-model:active="state.tabActive">
        <van-tab name="recommend" title="推荐" to="/recommend">
          <router-view/>
        </van-tab>
        <van-tab name="singers" title="歌手" to="/singers">
          <router-view/>
        </van-tab>
        <van-tab name="rank" title="排行榜" to="/rank">
          <router-view/>
        </van-tab>
    </van-tabs>
    </HomeLayoutContentWrapper>
  </HomeLayoutsWrapper>
</template>

<script>
import {HomeLayoutsWrapper, Top, HomeLayoutContentWrapper} from "./style"
import Recommend from "../page/recommend.vue"
import {reactive} from "vue"
import {useRoute} from "vue-router"
import {Toast} from "vant"
import globalStyle from "@/assets/global-style"
export default {
  components: {
    "HomeLayoutsWrapper": HomeLayoutsWrapper,
    "Top": Top,
    "HomeLayoutContentWrapper": HomeLayoutContentWrapper,
    "Recommend": Recommend
  },
  setup(){
    const state = reactive({
      count: 0,
        tabActive: "recommend",
        themeColor: globalStyle["theme-color"]
      })
      state.tabActive = useRoute().name

      // 点击左侧菜单
      function handleClickMenu(){
        Toast({
          message: "该功能暂未开发",
          duration: 1500
        })
      }
      return {
        state,
        handleClickMenu,
      }
  },
}
</script>

<style>

</style>