<template>
  <MiniPlayerStyled>
    <div @click="handleClick" class="icon">
      <van-image
        :class="{'miniPlayerImg': true, 'play': true, 'pause': !playing}"
        width="40px"
        height="40px"
        round
        :src="audioObj.al.picUrl"
      />
    </div>
    <div class="text">
      <div class="name">{{audioObj.name}}</div>
      <div class="desc">{{aral}}</div>
    </div>
    <div class="control" @click.stop="handleToggle">
      <van-circle
        size=".28rem"
        stroke-width="100"
        :rate="percent"
        :color="themeColor"
        v-model:current-rate="percent"
      >
        <slot>
          <van-icon
            v-if="playing && songReady"
            size="0.28rem"
            color="rgba(212,68,57,.5)"
            name="pause-circle-o"
          />
          <van-icon
            v-else
            size="0.28rem"
            color="rgba(212,68,57,.5)"
            name="play-circle-o"
          />
   
        </slot>
      </van-circle>
    </div>
    <div class="control">
      <van-icon size="0.28rem" :color="themeColor" name="wap-nav" />
    </div>
  </MiniPlayerStyled>
</template>

<script>
import { MiniPlayerStyled } from "./style";
import { computed, reactive, inject, watch} from "vue";
import { useStore } from "vuex";
import {SET_SHOW_PLAYER} from "@/store/modules/constant"

export default {
  name: "mini-player",
  props: {
      percent: {
          type: Number,
          default: () => 0
      },
      showNormal: {
        type: Boolean,
        required: true
      },
      songReady: {
        type: Boolean,
        required: true
      }
  },
  components: {
    MiniPlayerStyled,
  },
  setup(props, ctx) {
    const themeColor = inject("themeColor")

    const state = reactive({
    });

    const store = useStore();

    watch(() => store.getters["play/audioObj"], (pre) => {
    })
    const audioObj = computed(() => ({...store.getters["play/audioObj"]}));
    const playing = computed(() => store.state.play.playing)
    const aral = computed(() => {
        try {
            return audioObj.value.ar[0].name + "-" + audioObj.value.al.name
        } catch (error) {
            return ""
        }
    })
    /**
     * 点击切换音乐的播放或者暂停
     */
    function handleToggle() {
        ctx.emit("handleToggle")
    }
    /**
     * 点击事件
     */
    function handleClick(){
      ctx.emit("update:showNormal", true)
      store.commit(SET_SHOW_PLAYER, {
        data: false
      })
    }
    return {
      themeColor,
      state,
      handleToggle,
      audioObj,
      aral,
      handleClick,
      playing
    };
  },
};
</script>

<style>
</style>