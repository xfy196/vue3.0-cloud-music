<template>
  <SearchContainerStyled :playSwitch="playSwitch">
    <transition
      @enter="handleAnimateEnter"
      leave-active-class="animate__fadeOutRight animate__animated"
      appear="animate__animated animate__fadeInRight"
      enter-active-class="animate__animated animate__fadeInRight"
      duration="300"
    >
      <div v-show="state.show" class="searchContainer">
        <div class="header">
          <van-icon color="#fff" @click="handleBack" name="arrow-left" />
          <van-search
            @clear="handleClear"
            @search="handleSearch"
            :background="state.themeColor"
            autofocus
            shape="round"
            class="searchInput"
            v-model="state.keywords"
            placeholder="搜索歌曲、歌手、专辑"
          />
        </div>
        <div class="content">
          <!-- 热门搜索 -->
          <div class="hotContainer" v-if="!state.listShow">
            <div class="headTitle">热门搜索</div>
            <ul class="hotList">
              <li
                class="hotItem border"
                @click="handleSearch(item.first)"
                v-for="(item, index) in hots"
                :key="index"
              >
                <span>{{ item.first }}</span>
              </li>
            </ul>
          </div>
          <!-- 搜索的歌曲列表 -->
          <ScrollCom
            ref="scrollRef"
            :pullUpLoad="true"
            @pullUpLoad="handlePullUpLoad"
            v-else
            @initRequest="handelScrollCallback"
            :loading="state.loading"
          >
            <slot>
              <div v-show="page || !state.loading" class="searchListWrapper">
                <div class="suggestBox" v-if="suggest.artists">
                  <h3 class="title">相关歌手</h3>
                  <div class="border-bottom artistWrapper">
                    <van-image
                      width="0.5rem"
                      height="0.5rem"
                      :src="suggest.artists[0].picUrl"
                    />
                    <span class="name"
                      >歌手：{{ suggest.artists[0].name }}</span
                    >
                  </div>
                </div>
                <ul class="songList">
                  <li
                    class="songItem"
                    @click="handleClickSongItem(item)"
                    v-for="item in searchResult.songs"
                    :key="item.id"
                  >
                    <span class="songName">{{ item.name }}</span>
                    <span class="songAuthor">{{ songAuthor(item) }}</span>
                  </li>
                </ul>
              </div>
            </slot>
          </ScrollCom>
        </div>
      </div>
    </transition>
  </SearchContainerStyled>
</template>

<script>
import { SearchContainerStyled } from "./style";
import {
  reactive,
  onBeforeMount,
  computed,
  onUnmounted,
  ref,
  inject,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  GET_HOTS,
  GET_SEARCH_LIST,
  SET_SEARCHRESULT,
  GET_SUGGEST,
  SET_SUGGEST,
  SET_PAGE,
  SET_AUDIO_OBJ,
  SET_SHOW_PLAYER,
  SET_PLAYER_SONGS,
} from "@/store/modules/constant";
import Loading from "@/baseUI/loading/index.vue";
import ScrollCom from "@/packages/scroll/index.vue";
export default {
  components: {
    SearchContainerStyled,
    Loading,
    ScrollCom,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      show: false,
      keywords: "",
      themeColor: inject("themeColor"),
      listShow: false,
      loading: true,
    });

    const scrollRef = ref(null);
    onBeforeMount(async () => {
      await store.dispatch({
        type: "search/" + GET_HOTS,
      });
    });
    onUnmounted(() => {
      store.commit("search/" + SET_SEARCHRESULT, {
        hasMore: false,
        songCount: 0,
        songs: [],
      });
      store.commit("search/" + SET_SUGGEST, {});
    });
    const hots = computed(() => store.state.search.hots);
    const searchResult = computed(() => store.getters["search/searchResult"]);
    const page = computed(() => store.getters["search/page"]);
    const suggest = computed(() => store.getters["search/suggest"]);
    const songAuthor = computed(() => (item) => {
      let author = item.artists[0].name + "-" + item.album.name;
      return author;
    });
    const playSwitch = computed(() => store.state.playSwitch);
    const audioObj = computed(() => {
      return store.getters["play/audioObj"];
    });
    /**
     * 动画进场
     */
    function handleAnimateEnter() {
      state.show = true;
    }
    /**
     * 返回
     */
    function handleBack() {
      state.show = false;
      router.go(-1);
    }
    function handelScrollCallback(fn) {
      fn && fn(false);
    }
    /**
     * 加载更多的函数
     */
    async function handlePullUpLoad(fn) {
      if (searchResult.value.hasMore) {
        state.loading = true;
        store.commit("search/" + SET_PAGE, Number(page.value) + 1);
        await store.dispatch({
          type: "search/" + GET_SEARCH_LIST,
          data: {
            keywords: state.keywords,
            limit: 30 * page.value,
          },
        });
        state.loading = false;
        fn && fn();
      }
    }
    /**
     * 点击播放音乐
     */
    function handleClickSongItem(item) {
      let audioEle = audioObj.value.audioRef;
      if (audioObj.value.id === item.id) {
        return;
      }
      item.dt = item.duration;
      store.commit({
        type: "play/" + SET_AUDIO_OBJ,
        data: {
          ...item,
          playStatus: true,
        },
      });
      store.commit({
        type: SET_SHOW_PLAYER,
        data: true,
      });
      store.commit({
        type: "play/" + SET_PLAYER_SONGS,
        data: searchResult.songs,
      });
      audioEle.src = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
      audioEle.autoplay = true;
      audioEle.playbackRate = audioObj.value.speed;
      audioEle.play();
    }
    /**
     * 搜索方法
     */
    async function handleSearch(value) {
      state.keywords = value;
      state.listShow = true;
      state.loading = true;
      store.commit("search/" + SET_PAGE, 0);
      await store.dispatch({
        type: "search/" + GET_SUGGEST,
        data: {
          keywords: state.keywords,
        },
      });
      await store.dispatch({
        type: "search/" + GET_SEARCH_LIST,
        data: {
          keywords: value,
        },
      });
      state.loading = false;
      handleScrollTop();
    }

    /**
     * 点击清空方法
     */
    function handleClear() {
      state.listShow = false;
      store.commit("search/" + SET_SEARCHRESULT, {
        hasMore: false,
        songCount: 0,
        songs: [],
      });
      store.commit("search/" + SET_SUGGEST, {});
    }
    /**
     * 处理函数跳转到top为0的位置
     */
    function handleScrollTop() {
      scrollRef.value.scrollTo(0, 0);
    }
    return {
      state,
      handleAnimateEnter,
      handleBack,
      hots,
      handelScrollCallback,
      searchResult,
      handleSearch,
      handleClear,
      handlePullUpLoad,
      songAuthor,
      suggest,
      playSwitch,
      scrollRef,
      handleClickSongItem,
      page,
    };
  },
};
</script>

<style>
</style>