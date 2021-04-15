<template>
  <RecommendWrapper>
    <Before></Before>
    <Swiper :banners="state.banners"></Swiper>
    <RecommendList :title="state.title" :list="state.list"></RecommendList>
    <van-loading v-if="state.loading" :color="state.themeColor" :vertical="true" type="spinner"></van-loading>
  </RecommendWrapper>
</template>

<script>
import { RecommendWrapper } from "./style";
import Before from "./Before/index.vue"
import Swiper from "./swiper/index.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { GET_BANNERS, GET_RECOMMEND_LIST } from "@/store/modules/constant";
import globalStyle from "@/assets/global-style"
import RecommendList from "./recommendList/index.vue"
export default {
  components: {
    RecommendWrapper: RecommendWrapper,
    Swiper: Swiper,
    Before,
    RecommendList
  },
  setup() {
    const store = useStore();
    const state = reactive({
        themeColor: globalStyle["theme-color"],
        title: "推荐歌单",
        list: []
    });
    store.dispatch({
      type: "recommend/" + GET_BANNERS,
    });
    store.dispatch({
      type: "recommend/" + GET_RECOMMEND_LIST
    })
    state.banners = computed(() => store.state.recommend.banners);
    state.loading = computed(() => store.state.recommend.loading)
    state.list = computed(() => store.state.recommend. recommendList)
    return {
      state,
    };
  },
};
</script>

<style>
</style>