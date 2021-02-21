<template>
  <HomeLayoutsWrapper>
    <Top>
      <i class="iconfont menu" @click="handleClickMenu">&#xe65c;</i>
      <span class="title">云音乐</span>
      <i class="iconfont search">&#xe62b;</i>
    </Top>
    <HomeLayoutContentWrapper>
      <van-tabs background="#d44439" title-inactive-color="#e4e4e4" title-active-color="white" color="white" class="tabs" v-model:active="state.tabActive">
        <van-tab title="推荐">内容 1</van-tab>
        <van-tab title="歌手">内容 2</van-tab>
        <van-tab title="排行榜">内容 3</van-tab>
    </van-tabs>
    </HomeLayoutContentWrapper>
  </HomeLayoutsWrapper>
</template>

<script>
import {HomeLayoutsWrapper, Top, HomeLayoutContentWrapper} from "./style"
import {reactive} from "vue"
export default {
  components: {
    "HomeLayoutsWrapper": HomeLayoutsWrapper,
    "Top": Top,
    "HomeLayoutContentWrapper": HomeLayoutContentWrapper
  },
  setup(){
    // 注册组件
      const state = reactive({
        count: 0,
        tabActive: 0
      })
      function handleClickMenu(){
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