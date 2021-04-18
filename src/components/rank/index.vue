<template>
  <RankContainerStyled>
    <div class="official">
      <TitleCom :title="'官方榜'"></TitleCom>
      <ul class="officialList">
        <li class="officialItem">
          <van-image
            width="0.5rem"
            height="0.5rem"
            lazy-load
            radius="0.03rem"
            class="singerPic"
            src=""
          />
          <span>dasd</span>
        </li>
      </ul>
    </div>
    <div class="global">
      <TitleCom :title="'全球榜'"></TitleCom>
    </div>
  </RankContainerStyled>
</template>

<script>
import { reactive } from "vue";
import TitleCom from "@/baseUI/title/index.vue";
import { RankContainerStyled } from "./style";
export default {
  components: {
    TitleCom,
    RankContainerStyled,
  },
  setup() {
    const state = reactive({});
    return {
      ...state,
    };
  },
};
</script>

<style></style>
