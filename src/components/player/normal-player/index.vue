<template>
  <NormalPlayerContainer>
    <div class="background">
      <img
        src="https://p1.music.126.net/DG-1i1iYQ2rqC95fKA39aA==/109951163177823326.jpg?params=300x300"
        alt="歌曲图片"
      />
    </div>
    <div class="background layer"></div>
    <HeaderStyled>
      <div class="arrow">
        <van-icon @click="handleGoBack" name="arrow-down" />
      </div>
      <div class="titleBox">
        <div class="title">小酒窝</div>
        <div class="subTitle">林俊杰</div>
      </div>
    </HeaderStyled>
    <!-- 歌词播放区 -->
    <LayerContainer>
      <div class="layerRef" ref="LayerContainerRef">
        <transition
          duration="300"
          appear
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div
            @click="layerShow = !layerShow"
            class="cdWrapper"
            v-if="!layerShow"
          >
            <!-- 复古播放器头针图片 -->
            <div :class="{ needle: true, pause: !audioObj.playStatus }"></div>
            <div class="cd">
              <img
                class="image play pause"
                src="https://p1.music.126.net/DG-1i1iYQ2rqC95fKA39aA==/109951163177823326.jpg?params=300x300"
                alt=""
              />
            </div>
          </div>

          <div @click="layerShow = !layerShow" class="layerBox" v-else>img</div>
        </transition>
      </div>
    </LayerContainer>
  </NormalPlayerContainer>
</template>

<script>
import { NormalPlayerContainer, HeaderStyled, LayerContainer } from "./style";
import { SET_SHOW_PLAYER } from "@/store/modules/constant";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
export default {
  components: {
    NormalPlayerContainer,
    HeaderStyled,
    LayerContainer,
  },
  props: {
    showNormal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, ctx) {
    const store = useStore();
    const layerShow = ref(false);
    const LayerContainerRef = ref(null);
    function handleGoBack() {
      ctx.emit("update:showNormal", false);
      store.commit(SET_SHOW_PLAYER, { data: true });
    }

    const audioObj = computed(() => store.getters["play/audioObj"]);
    // mounted的钩子
    onMounted(() => {});
    return {
      handleGoBack,
      layerShow,
      audioObj,
      LayerContainerRef,
    };
  },
};
</script>

<style></style>
