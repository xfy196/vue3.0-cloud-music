<template>
  <MiniPlayerStyled>
    <div class="icon">
      <van-image
        :class="{'miniPlayerImg': true, 'play': true, 'pause': !audioObj.playStatus}"
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
            v-if="!audioObj.playStatus"
            size="0.28rem"
            color="rgba(212,68,57,.5)"
            name="play-circle-o"
          />
          <van-icon
            v-else
            size="0.28rem"
            color="rgba(212,68,57,.5)"
            name="pause-circle-o"
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
import { computed, reactive, inject} from "vue";
import { useStore } from "vuex";
import {SET_AUDIO_OBJ} from "@/store/modules/constant"

export default {
  name: "mini-player",
  props: {
      percent: {
          type: Number,
          default: () => 0
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

    const audioObj = computed(() => store.getters["play/audioObj"]);
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
        let audioRef = audioObj.value.audioRef
        let playStatus = audioObj.value.playStatus
        playStatus ? audioRef.pause(): audioRef.play()
        store.commit({
            type: "play/" + SET_AUDIO_OBJ,
            data: {
                playStatus: !playStatus
            }
        })
    }
    return {
      themeColor,
      state,
      handleToggle,
      audioObj,
      aral
    };
  },
};
</script>

<style>
</style>