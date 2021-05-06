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
    <van-action-sheet
      v-model:show="themeColorShow"
      :actions="actions"
      cancel-text="取消"
      title="换肤功能"
      close-on-click-action
      @select="handleThemeSelect"
    />
  </HomeLayoutsWrapper>
</template>

<script>
import {HomeLayoutsWrapper, Top, HomeLayoutContentWrapper} from "./style"
import Recommend from "../page/recommend.vue"
import {reactive, ref} from "vue"
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
      const themeColorShow = ref(false)
      const actions = [
        {
          name: "网易红",
          color: "rgb(229, 71, 60)"
        },
        {
          name: "企鹅绿",
          color: "rgb(49, 194, 124)"
        },
        {
          name: "酷狗蓝",
          color: "rgb(12, 142, 217)"
        },
        {
          name: "虾米橙",
          color: "rgb(255, 102, 0)"
        },
        {
          name: "炫酷黑",
          color: "rgb(34, 34, 34)"
        },
        {
          name: "可爱粉",
          color: "rgb(255, 135, 180)"
        },
        {
          name: "土豪金",
          color: "rgb(250, 172, 98)"
        }
      ]
      // 点击左侧菜单
      function handleClickMenu(){
        themeColorShow.value = true
      }
      /**
       * 选择对用内容的函数
       */
      function handleThemeSelect(action){
        const color = action.color
        let htmlNode = document.documentElement
        htmlNode.style.setProperty("--USER-THEME-COLOR", color)
        Toast({
          message: '皮肤切换成功'
        })
      }
      return {
        state,
        handleClickMenu,
        route,
        themeColorShow,
        actions,
        handleThemeSelect
      }
  },
}
</script>

<style>

</style>