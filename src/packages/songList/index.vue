<template>
  <SongListContainer id="songListContainer">
    <div class="header border-bottom">
      <div @click="handlePlayAll" className="play_all">
        <van-icon name="play-circle-o play" />
        <span>
          播放全部
          <span className="sum"> (共{{ songs.length }}首)</span>
        </span>
      </div>
      <van-button v-if="isCollect" icon="plus" :color="themeColor">
        <span>收藏({{ (subscribedCount / 1000).toFixed(2) }}万)</span>
      </van-button>
    </div>
    <!-- 列表 -->
    <ul class="songList">
      <li
        class="songItem"
        @click="handleClickSongItem($event, item, index)"
        v-for="(item, index) in songs"
        :key="item.id"
      >
        <span class="index">{{ index + 1 }}</span>
        <div class="songBox">
          <div class="name">{{ item.name }}</div>
          <div class="al">{{ al(item) }}</div>
        </div>
      </li>
    </ul>
  </SongListContainer>
</template>

<script>
import { SongListContainer } from "./style";
import globalStyle from "@/assets/global-style";
import { computed, onMounted, ref } from "vue";
import { useStore} from "vuex";
import {
  SET_AUDIO_OBJ,
  SET_SHOW_PLAYER,
  SET_PLAYER_SONGS,
  SET_CURRENT
} from "@/store/modules/constant";
import { Toast } from "vant";
export default {
  components: {
    SongListContainer,
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
    isCollect: {
      type: Boolean,
      default: () => true
    },
    subscribedCount: {
      type: Number,
      default: () => 0,
    },
  },
  name: "songList",
  setup(props) {
    const themeColor = ref(globalStyle["theme-color"]);
    const store = useStore();
    const isCollect = ref(props.isCollect)
    const al = computed(() => (item) => {
      return item.ar[0].name + "-" + item.al.name;
    });
    const audioObj = computed(() => {
      return store.getters["play/audioObj"];
    });

  onMounted(() => {
  })
    /**
     * 播放全部
     */
    function handlePlayAll() {
      // 判断该个是否在当前的歌曲列表中
      let bool = props.songs.some((item) => {
        return item.id === audioObj.value.id;
      });
      // 如果存在提示已有歌曲在播放 不存在直接切换为当前地一首歌曲
      if (bool) {
        audioObj.value.audioRef.play()
        store.commit({
            type: "play/" + SET_AUDIO_OBJ,
            data: {
                playStatus: true
            }
        })
        Toast({
          message: "歌曲正在播放中",
        });
      } else {
        handleClickSongItem(null,props.songs[0]);
      }
    }
    /**
     * 点击歌曲
     */
    function handleClickSongItem(e,item, index=0) {

      let audioEle = audioObj.value.audioRef;
      if (audioObj.value.id === item.id) {
        return;
      }
      store.commit({
        type: "play/" + SET_AUDIO_OBJ,
        data: {
          ...item,
          playStatus: true,
        },
      });
      store.commit({
        type: "play/" + SET_CURRENT,
        data:{
          currentIndex: index
        }
      })
      store.commit({
        type: SET_SHOW_PLAYER,
        data: true,
      });
      store.commit({
        type: "play/" + SET_PLAYER_SONGS,
        data: props.songs,
      });
      audioEle.src = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
      audioEle.autoplay = true;
      audioEle.playbackRate = audioObj.value.speed;
      audioEle.play();
    }
    return {
      themeColor,
      al,
      handleClickSongItem,
      audioObj,
      handlePlayAll,
    };
  },
};
</script>

<style>
</style>