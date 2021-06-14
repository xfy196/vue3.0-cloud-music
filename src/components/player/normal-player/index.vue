<template>
  <NormalPlayerContainer>
    <div class="background">
      <img
        :src="audioObj.al.picUrl"
        alt="歌曲图片"
      />
    </div>
    <div class="background layer"></div>
    <HeaderStyled>
      <div class="arrow">
        <van-icon @click="handleGoBack" name="arrow-down" />
      </div>
      <div class="titleBox">
        <div class="title">{{audioObj.name}}</div>
        <div class="subTitle">{{aral}}</div>
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
            <div :class="{ needle: true, pause: !playing }"></div>
            <div class="cd">
              <img
                :class="{image: true, play: playing, pause: !playing}"
                :src="audioObj.al.picUrl"
                alt=""
              />
            </div>
            <!-- 未进入歌词状态的时候的每一行歌词 -->
            <p class="playing_lyric">{{currentLyricValue}}</p>
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
    lyric: {
      type: String,
      required: true,
      default:""
    },
    currentLyricValue: {
      type: String,
      required: true
    }
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
    const playing = computed(() => store.state.play.playing)
    const aral = computed(() => {
        try {
            return audioObj.value.ar[0].name + "-" + audioObj.value.al.name
        } catch (error) {
            return ""
        }
    })
    // mounted的钩子
    onMounted(() => {});
    return {
      handleGoBack,
      layerShow,
      audioObj,
      LayerContainerRef,
      aral,
      playing
    };
  },
};
</script>

<style></style>
