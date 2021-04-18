<template>
  <SingersContainer
    :hotTypeScrollWidth="state.hotTypeScrollWidth"
    :alphaTypeScrollWidth="state.alphaTypeScrollWidth"
  >
    <CateScroll>
      <slot>
        <ul :ref="getHotTypeScrollRef" class="cateScroll hotTypeScroll">
          <li class="title">{{ state.hotTypesTitle }}</li>
          <li
            @click="handleClickHotType(item.key, index)"
            v-for="(item, index) in state.categoryTypes"
            :key="item.key"
          >
            <span
              :class="[state.hotTypeActive === index ? 'active border' : '']"
            >
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
          <li
            @click="handleClickAlphaType(item.key, index)"
            v-for="(item, index) in state.alphaTypes"
            :key="item.key"
          >
            <span :class="[state.alphaTypeActive === index ? 'active' : '']">
              {{ item.name }}
            </span>
          </li>
        </ul>
      </slot>
    </CateScroll>
    <div :ref="getSingerListContainer" class="singersListContainer">
      <van-pull-refresh
      :head-height="80"
        success-text="刷新成功"
       v-model="state.refresh" @refresh="onRefresh">
        <van-list
          finished-text="没有更多了"
          :loading="state.loading"
          :offset="10"
          :finished="state.finished"
          @load="handleLoading"
          :immediate-check="true"
        >
          <van-loading
            class="loading"
            slot="loading"
            v-show="state.loading && !state.refresh"
            :color="state.themeColor"
            :vertical="true"
            type="spinner"
          ></van-loading>
          <div
            class="singerItem border-bottom"
            v-for="item in state.singers"
            :key="item.id"
          >
            <van-image
              width="0.5rem"
              height="0.5rem"
              lazy-load
              radius="0.03rem"
              class="singerPic"
              :src="item.picUrl"
            />
            <span class="name">{{ item.name }}</span>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </SingersContainer>
</template>

<script>
import CateScroll from "@/packages/cate-scroll/index.vue";
import { SingersContainer } from "./style";
import { categoryTypes, alphaTypes } from "@/config/index";
import { reactive, onMounted, nextTick, watch, computed } from "vue";
import { useStore } from "vuex";
import globalStyle from "@/assets/global-style";
import { GET_SINGERS, SET_LOADING } from "@/store/modules/constant";
export default {
  components: {
    CateScroll,
    SingersContainer,
  },
  setup() {
    const store = useStore();
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
      themeColor: globalStyle["theme-color"],
      loading: true,
      searchObj: {
        cat: "",
        initial: "",
        offset: 0,
      },
      finished: false,
      singers: [],
      page: 0,
      more: true,
      singerListContainerRef: null,
      refresh: false
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
    const getSingerListContainer = (el) => {
      if (el) {
        state.singerListContainerRef = el;
      }
    };
    // watch
    watch(
      () => state.searchObj,
      async (val, oldVal) => {
        store.commit("singers/" + SET_LOADING, true);
        if (
          !state.more &&
          val.cat !== oldVal.cat &&
          val.initial !== oldVal.initial
        ) {
          return;
        }
        await store.dispatch({
          type: "singers/" + GET_SINGERS,
          data: val,
        });
        state.finished = false
        state.refresh = false
      },
      {
        immediate: true,
        deep: true,
      }
    );

    state.singers = computed(() => store.state.singers.singers);
    state.loading = computed(() => store.state.singers.loading);
    state.more = computed(() => store.state.singers.more);
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
    function handleClickHotType(key, index) {
      if (state.hotTypeActive === index) {
        state.searchObj.cat = "";
        state.hotTypeActive = -1;

        return;
      }
      state.singerListContainerRef.scrollTo({
        behavior: "auto",
        top: 0,
      });
      state.searchObj.cat = key;
      state.hotTypeActive = index;
      state.page = 0;
      state.searchObj.offset = 0;
    }
    /**
     * 点击字母分类
     */
    function handleClickAlphaType(key, index) {
      if (state.alphaTypeActive === index) {
        state.searchObj.initial = "";
        state.alphaTypeActive = -1;
        return;
      }
      state.singerListContainerRef.scrollTo({
        behavior: "smooth",
        top: 0,
      });
      state.searchObj.initial = key;
      state.alphaTypeActive = index;
      state.page = 0;
      state.searchObj.offset = 0;
    }
    /**
     * 处理加载的方法
     */
    async function handleLoading() {
      if (!state.more) {
          state.finished = true;
        return;
      }
      state.searchObj.offset = state.page++ * 50;
    }
    /**
     * 刷新页面
     */
    function onRefresh() {
      state.finished = false;
      state.page = 0;
      state.searchObj.offset = state.page * 50;
      state.searchObj = {
        ...state.searchObj
      }
    }
    return {
      state,
      getHotTypeScrollRef,
      getAlphaTypeScrollRef,
      handleClickHotType,
      handleClickAlphaType,
      handleLoading,
      getSingerListContainer,
      onRefresh,
    };
  },
};
</script>

<style></style>