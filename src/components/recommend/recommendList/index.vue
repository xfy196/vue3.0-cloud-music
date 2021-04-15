<template>
  <RecommendListStyled>
    <TitleCom :title="title"></TitleCom>
    <ListStyled>
      <van-row>
        <van-col v-for="item in list" :key="item.id" span="8">
          <div class="listItem">
            <div class="img_wrapper">
              <div class="decorate"></div>
              <van-image
                lazy-load
                :src="item.picUrl"
              />
              <div class="play_count">
                <i class="iconfont play">&#xe885;</i>
                <span class="count">{{ getPlayCount(item.playCount) }}</span>
              </div>
            </div>
              <div class="desc">{{item.name}}</div>
          </div>
        </van-col>
      </van-row>
    </ListStyled>
  </RecommendListStyled>
</template>

<script>
import TitleCom from "@/baseUI/title/index.vue";
import { RecommendListStyled, ListStyled } from "./style";
import { reactive, computed} from "vue";
export default {
  components: {
    TitleCom,
    RecommendListStyled,
    ListStyled,
  },
  props: {
    title: String,
    list: {
      type: Array,
    },
  },
  name: "RecommendList",
  setup() {
    const state = reactive({});
    /**
     * 重新甲酸payCount的数据
     */
    const getPlayCount = computed(() => {
      return (palyCount) => {
        return Math.ceil(palyCount / 10000) + "万";
      };
    });
    return {
      ...state,
      getPlayCount,
    };
  },
};
</script>

<style>
</style>