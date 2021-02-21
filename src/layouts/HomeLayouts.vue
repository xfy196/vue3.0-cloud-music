<template>
  <HomeLayoutsWrapper>
    <Top>
      <i class="iconfont menu" @click="handleClickMenu">&#xe65c;</i>
      <span class="title">云音乐</span>
      <i class="iconfont search">&#xe62b;</i>
    </Top>
    <HomeLayoutContentWrapper>
      <van-tabs background="#d44439" title-inactive-color="#e4e4e4" title-active-color="white" color="white" class="tabs" v-model:active="state.tabActive">
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
import { useRoute} from "vue-router"
import {Toast} from "vant"
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
        tabActive: "recommend"
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
        handleClickMenu
      }
  },
}
</script>

<style>

</style>