<template>
  <ScrollCom @initRequest="initRequest" :loading="state.loading">
    <slot>
      <RecommendWrapper>
        <Before></Before>
        <Swiper :banners="state.banners"></Swiper>
        <RecommendList
          v-show="!state.loading"
          id="recommend"
          :title="state.title"
          :list="state.list"
        ></RecommendList>
        <van-loading
        class="loading"
          v-show="state.loading"
          :color="state.themeColor"
          :vertical="true"
          type="spinner"
        ></van-loading>
      </RecommendWrapper>
    </slot>
  </ScrollCom>
</template>

<script>
import { RecommendWrapper } from "./style";
import ScrollCom from "@/packages/scroll/index.vue";
import Before from "./Before/index.vue";
import Swiper from "./swiper/index.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { GET_BANNERS, GET_RECOMMEND_LIST, SET_LOADING } from "@/store/modules/constant";
import globalStyle from "@/assets/global-style";
import RecommendList from "./recommendList/index.vue";
export default {
  components: {
    RecommendWrapper: RecommendWrapper,
    Swiper: Swiper,
    Before,
    RecommendList,
    ScrollCom,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      themeColor: globalStyle["theme-color"],
      title: "推荐歌单",
      list: [],
    });
    initRequest()
    state.banners = computed(() => store.state.recommend.banners);
    state.loading = computed(() => store.state.recommend.loading);
    state.list = computed(() => store.state.recommend.recommendList);
    async function initRequest(fn) {
      store.commit("recommend/" + SET_LOADING, true)
        await store.dispatch({
          type: "recommend/" + GET_BANNERS,
        });
       await  store.dispatch({
          type: "recommend/" + GET_RECOMMEND_LIST,
        });
        fn && fn(store.getters["recommend/loading"])
    }
    return {
      state,
      initRequest
    };
  },
};
</script>

<style>
</style>