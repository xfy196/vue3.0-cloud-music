<template>
  <SingerContainer>
    <transition
      leave-active-class="animate__fadeOutRight animate__animated"
      appear="animate__animated animate__fadeInRight"
      enter-active-class="animate__animated animate__fadeInRight"
      duration="300"
    >
      <div v-show="state.show">
        <header ref="headerRef" class="headerTop">
          <van-icon @click="router.go(-1)" name="arrow-left" />
          <h2 class="singerName">歌手名字</h2>
        </header>

        <ImgWrapper
          background="https://p2.music.126.net/dwbXimgQn1YnJzwSlPDk-A==/109951165911950321.jpg"
        >
          <div ref="imgWrapperRef" class="filter"></div>
        </ImgWrapper>
        <CollectionButton>
          <van-button round icon="plus" :color="state.themeColor"
            >收藏</van-button
          >
        </CollectionButton>
        <div @scroll="handleSongsScroll" ref="songsRef" class="songsWrapper">
          <SongList :isCollect="false" :songs="songs"></SongList>
        </div>
      </div>
    </transition>
    <Loading v-show="loading"></Loading>
  </SingerContainer>
</template>

<script>
import { SingerContainer, ImgWrapper, CollectionButton } from "./style.js";
import { reactive, ref, onMounted, computed, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import globalStyle from "@/assets/global-style";
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
    const state = reactive({
      themeColor: globalStyle["theme-color"],
      show: false,
    });
    let id = route.params.id;
    const songs = computed(() => store.getters["singer/getSongs"]);
    const loading = ref(true);
    const songsRef = ref(null);
    const headerRef = ref(null)
    const imgWrapperRef = ref(null);
    let OFFSET = 5;
    watch(loading, (state, preState) => {
      if (!state) {
        nextTick(() => {
          let h = imgWrapperRef.value.offsetHeight;
          songsRef.value.style.top = `${(h - OFFSET) / 100}rem`;
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
        if(scrollTop > 5 ){
            let h = headerRef.value.offsetHeight;
            if(songs.value.offsetTop === h){
                return
            }
            songsRef.value.style.top = `${h / 100}rem`;
        }else if(scrollTop <= 0){
            let h = imgWrapperRef.value.offsetHeight;
            if(songsRef.value.style.top - OFFSET === h){
                return
            }
            songsRef.value.style.top = `${(h - OFFSET) / 100}rem`;
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
      handleSongsScroll
    };
  },
};
</script>

<style>
</style>