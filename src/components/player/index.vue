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
      @handleToggle="handleToggle"
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
      :currentLyricValue="currentLyricValue"
      ref="NormalPlayerRef"
      v-model:showNormal="showNormal"
      v-if="showNormal"
      :speed="speed"
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
import {
  SET_AUDIO_REF,
  SET_AUDIO_OBJ,
  SET_LRC,
  SET_CURRENT,
  SET_PLAYING
} from "@/store/modules/constant";
import { Toast } from "vant";
import NormalPlayer from "./normal-player/index.vue";
import animations from "create-keyframe-animation";
import Lyric from "@/utils/lyric-parser";
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
    let currentLyric = ref(null);
    let currentLineNum = ref(0);
    let songReady = ref(true);
    let currentLyricValue = ref("")
    const lyric = computed(() => store.getters["play/lyric"]);
    const audioObj = computed(() => store.getters["play/audioObj"]);
    const songs = computed(() => store.getters["play/songs"]);
    const speed = computed(() => store.getters["play/speed"]);
    const currentIndex = computed(() => store.getters["play/currentIndex"]);
    const playing = computed(() => store.state.play.playing)

    // 监听当前歌曲的index是否发生变化
    watch(
      [() => store.state.play.currentIndex, () => store.state.play.songs],
      async ([currentIndex, songs]) => {
        // 有一些特殊情况我们需要直接结束
        if (
          currentIndex === -1 ||
          !songs.length ||
          audioObj.value.id === songs[currentIndex].id ||
          !songs[currentIndex] ||
          !songReady.value
        ) {
          return;
        }
        // 每一次重新改变的时候我们都需要清空定时器
        currentLyric.value ? currentLyric.value.stop() : "";
        songReady.value = false;
        // 重新设置歌词
        store.commit({
          type: "play/" + SET_LRC,
          data: "",
        });
        await changeSong();
    //      // 设置播放状态
    // togglePlayingDispatch(true);
    // // 设置当前歌曲时间播放点
    // setCurrentTime(0);
    // // 设置总秒数
    // setDuration((current.dt / 1000) | 0);
        getLyric(currentIndex);
      }
    );

    watch(
      [songReady, () => store.state.play.playing],
      ([preSongReady], [nextSongReady]) => {
        console.log(preSongReady && store.state.play.playing)
        preSongReady && store.state.play.playing ? audioRef.value.play() : audioRef.value.pause();
      }
    );
    onMounted(() => {
      store.commit({
        type: "play/" + SET_AUDIO_REF,
        data: audioRef.value,
      });
    });

    /**
     * 获取歌词的操作
     */
    async function getLyric(index) {
      await store.dispatch({
        type: "play/getPlayingLyric",
        id: songs.value[index].id,
      });
      currentLyric.value = new Lyric(lyric.value, handleLyric, speed);
      currentLyric.value.play();
      songReady.value = true;
      currentLineNum.value = 0;
      currentLyric.value.seek(0);
    }
    /**
     * 处理歌曲歌词显示的函数
     */
    const handleLyric = ({ lineNum, txt }) => {
      // 不存在歌词的时候直接结束
      if (!currentLyric) {
        return;
      }
      currentLineNum.value = lineNum;
      currentLyricValue.value = txt
    };
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
      // 如果结束就需要切换歌曲
      let index = currentIndex.value;
      if (
        index === songs.value.length - 1 ||
        index < 0 || !audioObj.id
      ) {
      } else {
        index += 1;
      }
      store.commit({
        type: "play/" + SET_CURRENT,
        data: {
          currentIndex: index,
        },
      });
      store.commit({
        type: "play/" + SET_AUDIO_OBJ,
        data: songs.value[index]
      });
      store.commit({
        type: "play/"+SET_PLAYING,
        data: true
      })
      audioEle.src = `https://music.163.com/song/media/outer/url?id=${
        songs.value[index].id
      }.mp3`;
      audioEle.autoplay = true;
      audioEle.playbackRate = audioObj.value.speed;
    }
    const percent = computed(() => {
      return isNaN((state.currentTime * 100000) / audioObj.value.dt)
        ? 0
        : (state.currentTime * 100000) / audioObj.value.dt;
    });


    // 点击播放器暂停或者播放
    function handleToggle(){
      let audioRef = audioObj.value.audioRef
        playing.value ? audioRef.pause(): audioRef.play()
        store.commit({
            type: "play/" + SET_PLAYING,
            data: !playing.value
        })
        if(currentLyric.value){
          currentLyric.value.togglePlay(state.currentTime * 1000)
        }
    }


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
      lyric,
      currentLyricValue,
      handleToggle,
      speed
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
