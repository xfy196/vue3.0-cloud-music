<template>
  <SingersContainer :hotTypeScrollWidth="state.hotTypeScrollWidth" :alphaTypeScrollWidth="state.alphaTypeScrollWidth">
    <CateScroll>
      <slot>
        <ul :ref="getHotTypeScrollRef" class="cateScroll hotTypeScroll">
          <li class="title">{{ state.hotTypesTitle }}</li>
          <li @click="handleClickHotType(item.name, index)" v-for="(item, index) in state.categoryTypes" :key="item.key">
              <span :class="[state.hotTypeActive === index? 'active border': '']">
            {{ item.name }}
              </span>
          </li>
        </ul>
      </slot>
    </CateScroll>
    <CateScroll>
      <slot>
        <ul :ref="getAlphaTypeScrollRef" class="cateScroll alphaTypeScroll">
          <li class="title">{{ state.alphaTypesTitle }}</li>
          <li @click="handleClickAlphaType(item.name, index)" v-for="(item, index) in state.alphaTypes" :key="item.key">
              <span :class="[state.alphaTypeActive === index? 'active': '']">

            {{ item.name }}
              </span>
          </li>
        </ul>
      </slot>
    </CateScroll>
  </SingersContainer>
</template>

<script>
import CateScroll from "@/packages/cate-scroll/index.vue";
import { SingersContainer } from "./style";
import { categoryTypes, alphaTypes } from "@/config/index";
import { reactive, onMounted, nextTick } from "vue";
export default {
  components: {
    CateScroll,
    SingersContainer,
  },
  setup() {
    const state = reactive({
      hotTypesTitle: "分类(默认热门):",
      alphaTypesTitle: "首字母:",
      categoryTypes,
      HotTypeScrollRef: null,
      hotTypeScrollWidth: 0,
      alphaTypeScrollWidth: 0,
      alphaTypes,
      AlphaTypeScrollRef: null,
      hotTypeActive: -1,
      alphaTypeActive: -1,
      searchObj: {
          hotType: "",
          alphaType: ""
      }
    });
    const getHotTypeScrollRef = (el) => {
      if (el) {
        state.HotTypeScrollRef = el;
      }
    };
    const getAlphaTypeScrollRef = (el) => {
      if (el) {
        state.AlphaTypeScrollRef = el;
      }
    };
    onMounted(() => {
      // 计算总宽度
      nextTick(() => {
        let newHotTypeScrollC = Array.from(state.HotTypeScrollRef.children);
        let newAlphaTypeScrollC = Array.from(state.AlphaTypeScrollRef.children);
        state.hotTypeScrollWidth = newHotTypeScrollC.reduce((num, item) => {
          return item.clientWidth + num;
        }, 0);
        state.alphaTypeScrollWidth = newAlphaTypeScrollC.reduce((num, item) => {
          return item.clientWidth + num;
        }, 0);
      });
    });
    /**
     * 点击热分类
     */
    function handleClickHotType(name, index){
        state.searchObj.hotType = name
        state.hotTypeActive = index
        console.log(state.hotTypeActive)
    }
    /**
     * 点击字母分类
     */
    function handleClickAlphaType(name, index){
        state.searchObj.alphaType = name
        state.alphaTypeActive = index

    }
    return {
      state,
      getHotTypeScrollRef,
      getAlphaTypeScrollRef,
      handleClickHotType,
      handleClickAlphaType
    };
  },
};
</script>

<style>
</style>