<template>
  <transition
    duration="500"
    appear
    enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__animated animate__fadeOutDown"
  >
    <MiniPlayer
      v-show="playSwitch"
      v-model:showNormal="showNormal"
      :percent="percent"
    ></MiniPlayer>
  </transition>
  <transition
    duration="500"
    appear
    name="normal"
    v-on:enter="handleEnter"
    v-on:after-leave="handleAfterLeave"
    v-on:after-enter="handleAfterEnter"
    v-on:leave="handleLeave"
  >
    <NormalPlayer
      :lyric="lyric"
      ref="NormalPlayerRef"
      v-model:showNormal="showNormal"
      v-if="showNormal"
    ></NormalPlayer>
  </transition>
  <audio
    @ended="handleEnded"
    @timeupdate="handelTimeUpdate"
    ref="audioRef"
    @error="handleAudioError"
  ></audio>
</template>

<script>
import MiniPlayer from "./mini-player/index.vue";
import { prefixStyle } from "@/utils";
import { computed, reactive, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { SET_AUDIO_REF, SET_AUDIO_OBJ } from "@/store/modules/constant";
import { Toast } from "vant";
import NormalPlayer from "./normal-player/index.vue";
import animations from "create-keyframe-animation";
import Lyric from "@/utils/lyric-parser"
export default {
  components: {
    MiniPlayer,
    NormalPlayer,
  },
  setup() {
    const state = reactive({
      currentTime: 0,
    });
    const store = useStore();
    const playSwitch = computed(() => store.state.playSwitch);
    const showNormal = ref(false);
    const audioRef = ref(null);
    const NormalPlayerRef = ref(null);
    const transform = ref(prefixStyle("transform"));
    let currentLyric = ref(null)
    let currentLineNum = ref(0)
    // 监听当前歌曲的index是否发生变化
    watch(() => store.state.play.currentIndex, async () => {
      await store.dispatch({
        type: "play/getPlayingLyric",
        id: audioObj.value.id
      })
      currentLyric = new Lyric(lyric.value, handleLyric, speed)
      // songReady.current = true
      currentLyric.play()
      currentLineNum = 0
      currentLyric.seek(0)
    })

    onMounted(() => {
      store.commit({
        type: "play/" + SET_AUDIO_REF,
        data: audioRef.value,
      });
    });
    const lyric = computed(() => store.getters["play/lyric"])
    const audioObj = computed(() => store.getters["play/audioObj"]);
    const songs = computed(() => store.getters["play/songs"]);
    const speed = computed(() => store.getters["play/speed"])

  /**
   * 处理歌曲歌词显示的函数
   */
   const handleLyric = ({ lineNum, txt }) => {
    // 不存在歌词的时候直接结束
    if (!currentLyric) {
      return
    }
    currentLineNum = lineNum
    console.log(txt)
    // setCurrentPlayingLyric(txt)
  }
    /**
     * 处理时间更新
     */
    function handelTimeUpdate(e) {
      state.currentTime = e.target.currentTime;
      let id = audioObj.value.id;
    }
    /**
     * 歌曲播放错误
     */
    function handleAudioError() {
      Toast({
        message: "歌曲播放错误, 自动切换下一首",
      });
      changeSong();
    }
    /**
     * 处理歌曲播放结束
     */
    function handleEnded() {
      changeSong();
    }
    /**
     * 切换歌曲
     */
    function changeSong() {
      let audioEle = audioObj.value.audioRef;
      audioEle.pause();
      // 如果结束就需要切换歌曲
      let id = audioObj.value.id;
      let index = songs.value.findIndex((item) => {
        if (item.id === id) {
          return true;
        } else {
          return false;
        }
      });
      if (index === songs.value.length - 1 || index < 0) {
        index = 0;
      } else {
        index++;
      }
      store.commit({
        type: "play/" + SET_AUDIO_OBJ,
        data: {
          ...songs.value[index],
        },
      });
      audioEle.src = `https://music.163.com/song/media/outer/url?id=${songs.value[index].id}.mp3`;
      audioEle.play();
    }
    const percent = computed(() => {
      return isNaN((state.currentTime * 100000) / audioObj.value.dt)
        ? 0
        : (state.currentTime * 100000) / audioObj.value.dt;
    });

    function handleAfterEnter() {
      if (!NormalPlayerRef.value) {
        return;
      }
      let cdWrapperDom = NormalPlayerRef.value.LayerContainerRef;
      // 离开之后解绑之前的animations对象注册的动画
      animations.unregisterAnimation("move");
      cdWrapperDom.style.animation = "";
    }
    /**
     * 动画进入的阶段
     */
    function handleEnter(el, done) {
      if (!NormalPlayerRef.value) {
        return;
      }
      let cdWrapperDom = NormalPlayerRef.value.LayerContainerRef;
      cdWrapperDom.style.display = "block";
      const { x, y, scale } = _getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`,
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`,
        },
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear",
        },
      });
      animations.runAnimation(cdWrapperDom, "move", done);
    }
    function _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale,
      };
    }
    /**
     * 动画离开之后
     */
    function handleAfterLeave(el) {
      let cdWrapperDom = null;
      if (!NormalPlayerRef.value) {
        cdWrapperDom = el.querySelector(".layerRef");
      } else {
        cdWrapperDom = NormalPlayerRef.value.LayerContainerRef;
      }

      cdWrapperDom.style.transition = "";
      cdWrapperDom.style[transform.value] = "";
    }
    function handleLeave(el, done) {
      let cdWrapperDom = null;
      if (!NormalPlayerRef.value) {
        cdWrapperDom = el.querySelector(".layerRef");
      } else {
        cdWrapperDom = NormalPlayerRef.value.LayerContainerRef;
      }

      // 如果不存在的时候直接就退出
      if (!cdWrapperDom) {
        return;
      }
      cdWrapperDom.addEventListener("transitionend", () => {
        done();
      });
      cdWrapperDom.style.transition = "all 0.4s";
      const { x, y, scale } = _getPosAndScale();
      cdWrapperDom.style[
        transform.value
      ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    }
    return {
      playSwitch,
      audioRef,
      handelTimeUpdate,
      percent,
      handleEnded,
      handleAudioError,
      showNormal,
      handleEnter,
      NormalPlayerRef,
      handleAfterEnter,
      handleAfterLeave,
      handleLeave,
      lyric
    };
  },
};
</script>

<style lang="css" scoped>
.normal-enter .top,
.normal-exit-to .top {
  transform: translate3d(0, -100px, 0);
}
.normal-enter .bottom,
.normal-exit-done .bottom {
  transform: translate3d(0, 100px, 0);
}
.normal-enter-active,
.normal-leave-active {
  opacity: 1;
  transition: all 0.4s;
}
.normal-enter-active .top,
.normal-enter-active .bottom,
.normal-leave-active .top,
.normal-leave-active .bottom {
  transform: translate3d(0, 0, 0);
  transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
}
.normal-leave-active {
  opacity: 0;
}
</style>
