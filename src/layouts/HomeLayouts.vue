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
      <van-tabs :lazy-render="true" :sticky="true" :background="state.themeColor" title-inactive-color="white" title-active-color="white" color="white" class="tabs" v-model:active="state.tabActive">
        <van-tab :name="item.name" :title="item.title" :to="item.path" v-for="(item, index) in state.tabs" :key="index">
          <keep-alive exclude="Recommend,Rank" v-if="route.name===item.name">
            <router-view/>
          </keep-alive>
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
    "Recommend": Recommend,
  },
  setup(){
    const state = reactive({
      tabs: [
        {
          name: "recommend",
          title: "推荐",
          path: "/recommend"
        },
        {
          name: "singers",
          title: "歌手",
          path: "/singers"
        },
        {
          name: "rank",
          title: "排行榜",
          path: "/rank"
        },
      ],
      count: 0,
        tabActive: "recommend",
        themeColor: globalStyle["theme-color"]
      })
      const route = useRoute()
      state.tabActive = route.name
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
        route
      }
  },
}
</script>

<style>

</style>