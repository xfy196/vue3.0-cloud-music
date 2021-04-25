<template>
  <SongListContainer>
    <div class="header border-bottom">
      <div className="play_all">
        <van-icon name="play-circle-o play" />
        <span>
          播放全部
          <span className="sum"> (共{{songs.length}}首)</span>
        </span>
      </div>
      <van-button :color="themeColor">
          <van-icon name="plus" /> <span>收藏(0.2万)</span>
        </van-button>
    </div>
    <!-- 列表 -->
    <ul class="songList">
        <li class="songItem" v-for="(item, index) in songs" :key="item.id">
            <span class="index">{{index + 1}}</span>
            <div class="songBox">
                <div class="name">{{item.name}}</div>
                <div class="al">{{al(item)}}</div>
            </div>
        </li>
    </ul>
  </SongListContainer>
</template>

<script>
import { SongListContainer } from "./style";
import globalStyle from "@/assets/global-style"
import {computed, ref} from "vue"
export default {
  components: {
    SongListContainer,
  },
  props: {
      songs: {
          type: Array,
          default: () => []
      }
  },
  name: "songList",
  setup(){
      const themeColor = ref(globalStyle["theme-color"])
      const al = computed(()=> (item) => {
          return item.ar[0].name + "-" + item.al.name 
      })
      return {
          themeColor,
          al
      }
  }
};
</script>

<style>
</style>