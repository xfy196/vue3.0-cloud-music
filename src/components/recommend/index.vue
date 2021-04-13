<template>
  <RecommendWrapper>
    <Before></Before>
    <Swiper :banners="state.banners"></Swiper>
    <van-loading v-if="state.loading" :color="state.themeColor" :vertical="true" type="spinner"></van-loading>
  </RecommendWrapper>
</template>

<script>
import { RecommendWrapper } from "./style";
import Before from "./Before/index.vue"
import Swiper from "./swiper/index.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { GET_BANNERS } from "@/store/modules/constant";
import globalStyle from "@/assets/global-style"
export default {
  components: {
    RecommendWrapper: RecommendWrapper,
    Swiper: Swiper,
    Before
  },
  setup() {
    const store = useStore();
    const state = reactive({
        themeColor: globalStyle["theme-color"]
    });
    store.dispatch({
      type: "recommend/" + GET_BANNERS,
    });
    state.banners = computed(() => store.state.recommend.banners);
    state.loading = computed(() => store.state.recommend.loading)
    return {
      state,
    };
  },
};
</script>

<style>
</style>