<template>
  <MiniPlayer v-show="playSwitch" :percent="percent"></MiniPlayer>
  <audio
    @ended="handleEnded"
    @timeupdate="handelTimeUpdate"
    ref="audioRef"
  ></audio>
</template>

<script>
import MiniPlayer from "./mini-player/index.vue";
import { computed, reactive, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { SET_AUDIO_REF, SET_AUDIO_OBJ } from "@/store/modules/constant";
export default {
  components: {
    MiniPlayer,
  },
  setup() {
    const state = reactive({
      currentTime: 0,
    });
    const store = useStore();
    const playSwitch = computed(() => store.state.playSwitch);
    const audioRef = ref(null);
    onMounted(() => {
      store.commit({
        type: "play/" + SET_AUDIO_REF,
        data: audioRef.value,
      });
    });
    const audioObj = computed(() => store.getters["play/audioObj"]);
    const songs = computed(() => store.getters["play/songs"]);
    /**
     * 处理时间更新
     */
    function handelTimeUpdate(e) {
      state.currentTime = e.target.currentTime;
      let id = audioObj.value.id;
    }
    /**
     * 处理歌曲播放结束
     */
    function handleEnded() {
      let audioEle = audioObj.value.audioRef
        audioEle.pause()
      // 如果结束就需要切换歌曲
      let id = audioObj.value.id;
      let index = songs.value.findIndex((item) => {
        if (item.id === id) {
          return true;
        } else {
          return false;
        }
      });
      if (index === songs.value.length || index < 0) {
        index = 0;
      }else {
          index++
      }
      store.commit({
        type: "play/" + SET_AUDIO_OBJ,
        data: {
          ...songs.value[index],
        },
      });
      audioEle.src = `https://music.163.com/song/media/outer/url?id=${songs.value[index].id}.mp3`
      audioEle.play()
    }
    const percent = computed(() => {
      return isNaN((state.currentTime * 100000) / audioObj.value.dt)
        ? 0
        : (state.currentTime * 100000) / audioObj.value.dt;
    });
    return {
      playSwitch,
      audioRef,
      handelTimeUpdate,
      percent,
      handleEnded,
    };
  },
};
</script>

<style>
</style>