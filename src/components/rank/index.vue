<template>
  <RankContainerStyled>
    <div class="official">
      <TitleCom :title="'官方榜'"></TitleCom>
      <ul class="officialList">
        <li class="officialItem border-bottom" @click="handleGoDetail(item)" v-for="item in detail.list.slice(0, 4)" :key="item.id">
          <div class="img_wrapper">
          <van-image
            width="1rem"
            height="1rem"
            lazy-load
            radius="0.03rem"
            class="singerPic"
            :src="item.coverImgUrl"
          />
          <div class="update_frequecy">{{item.updateFrequency}}</div>
          </div>
          <ul class="songList">
            <li v-for="(item, index) in item.tracks" :key="index" class="songItem">{{index + 1}} {{item.first}} {{item.second}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="global">
      <TitleCom :title="'全球榜'"></TitleCom>
      <ul class="globalList">
        <li class="globalItem border-bottom" @click="handleGoDetail(item)" v-for="item in detail.list.slice(4)" :key="item.id">
            <div class="img_wrapper">
          <van-image
            width="1.2rem"
            height="1.2rem"
            lazy-load
            radius="0.03rem"
            class="singerPic"
            :src="item.coverImgUrl"
          />
          <div class="update_frequecy">{{item.updateFrequency}}</div>
          </div>
        </li>
      </ul>
    </div>
    <van-loading
        class="loading"
          v-show="loading"
          :color="themeColor"
          :vertical="true"
          type="spinner"
        ></van-loading>
  </RankContainerStyled>
</template>

<script>
import { computed, reactive, onMounted } from "vue";
import {useStore} from "vuex"
import TitleCom from "@/baseUI/title/index.vue";
import { RankContainerStyled } from "./style";
import globalStyle from "@/assets/global-style";
import {GET_RANK_DETAIL} from "@/store/modules/constant"
import { useRouter } from 'vue-router';
export default {
  components: {
    TitleCom,
    RankContainerStyled,
  },
  setup() {
    const state = reactive({
      themeColor: globalStyle["theme-color"]
    });
    const router = useRouter()
    const store = useStore()
    const detail = computed(() => store.state.rank.detail)
    const loading = computed(() => store.state.rank.loading)
    initRequest()
      /**
       * 初始化的请求
       */
      async function initRequest(){
       await store.dispatch({
          type: "rank/" + GET_RANK_DETAIL
        })
      }
      /**
       * 点击跳转详情页面
       */
      function handleGoDetail(item){
        router.push({
          path: `/rank/${item.id}`,
        })
      }
      onMounted(() => {
      })
    return {
      ...state,
      detail,
      loading,
      handleGoDetail
    };
  },
};
</script>

<style></style>
