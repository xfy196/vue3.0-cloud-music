<template>
  <SingerContainer :playSwitch="playSwitch">
    <transition
      leave-active-class="animate__fadeOutRight animate__animated"
      appear="animate__animated animate__fadeInRight"
      enter-active-class="animate__animated animate__fadeInRight"
      duration="300"
    >
      <div v-show="state.show">
        <header ref="headerRef" class="headerTop">
          <van-icon size="0.16rem" @click="router.go(-1)" name="arrow-left" />
          <h2 class="singerName">{{songs.artist.name}}</h2>
        </header>

        <ImgWrapper
          :background="songs.artist.picUrl"
        >
          <div ref="imgWrapperRef" class="filter"></div>
        </ImgWrapper>
        <CollectionButton>
          <van-button round icon="plus" :color="state.themeColor"
            >收藏</van-button
          >
        </CollectionButton>
        <div id="songsContainer" @scroll="handleSongsScroll" class="songsContainer">
            <div  ref="songsRef" class="songsWrapper">
            <SongList :isCollect="false" :songs="songs.hotSongs"></SongList>
            </div>
        </div>
      </div>
    </transition>
    <Loading v-show="loading"></Loading>
  </SingerContainer>
</template>

<script>
import { SingerContainer, ImgWrapper, CollectionButton } from "./style.js";
import { reactive, ref, onMounted, computed, watch, nextTick, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "@/baseUI/loading/index.vue";
import SongList from "@/packages/songList/index.vue";
import { useStore } from "vuex";
import { GET_SINGER_SONGS } from "@/store/modules/constant";
export default {
  components: {
    SingerContainer,
    ImgWrapper,
    CollectionButton,
    Loading,
    SongList,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const playSwitch = computed(() => store.state.playSwitch);
    const state = reactive({
      themeColor: inject("themeColor"),
      show: false,
    });
    let id = route.params.id;
    const songs = computed(() => store.getters["singer/getSongs"]);
    const loading = ref(true);
    const songsRef = ref(null);
    const headerRef = ref(null)
    const imgWrapperRef = ref(null);
    watch(loading, (state, preState) => {
      if (!state) {
        nextTick(() => {
          let h = imgWrapperRef.value.offsetHeight;
          songsRef.value.style.top = `${h / 100}rem`;
        });
      }
    });
    /**
     * mounted函数
     */
    onMounted(async () => {
      await store.dispatch({
        type: "singer/" + GET_SINGER_SONGS,
        id,
      });
      state.show = true;
      loading.value = false;
    });
    /**
     * 处理歌曲滚动的函数
     */
    function handleSongsScroll(e){
        let scrollTop = e.target.scrollTop
            if(imgWrapperRef.value.offsetHeight - scrollTop <= headerRef.value.offsetHeight){
                document.getElementById("songsContainer").style.top = headerRef.value.offsetHeight + "px"
                return
            }else if(scrollTop <= 0){
                document.getElementById("songsContainer").style.top = 0 + "px"

            }
    }
    return {
      router,
      state,
      loading,
      songs,
      songsRef,
      imgWrapperRef,
      headerRef,
      handleSongsScroll,
      playSwitch
    };
  },
};
</script>

<style>
</style>