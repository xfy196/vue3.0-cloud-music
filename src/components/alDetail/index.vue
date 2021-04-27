<template>
  <SongListStyled :playSwitch="playSwitch" @scroll="handleScroll" :coverImgUrl="coverImgUrl">
    <transition
      appear="animate__animated animate__fadeInRight"
      leave-active-class="animate__fadeOutRight animate__animated"
      enter-active-class="animate__animated animate__fadeInRight"
      duration="300"
    >
      <div v-show="show">
        <HeaderTitle
          ref="headRef"
          v-model:show.sync="show"
          :isMarquee="isMarquee"
          :title="title"
        ></HeaderTitle>
        <div class="detailContainer">
          <div class="detailBackgroundWrapper">
            <div class="background"></div>
            <div class="img_wrapper">
              <div class="decorate"></div>
              <van-image
                class="image"
                lazy-load
                width="1.2rem"
                height="1.2rem"
                :src="coverImgUrl"
                alt=""
              />
              <div class="play_count">
                <i class="iconfont play">&#xe885;</i>
                <span class="count">{{ playCounts }}</span>
              </div>
            </div>
            <div class="desc_wrapper">
              <div class="title">
                {{ detail.playlist ? detail.playlist.name : "" }}
              </div>
              <div class="person">
                <div class="avatar">
                  <van-image
                    width="0.2rem"
                    height="0.2rem"
                    radius="100%"
                    :src="
                      detail.playlist ? detail.playlist.creator.avatarUrl : ''
                    "
                  />
                </div>
                <div class="name">
                  {{ detail.playlist ? detail.playlist.creator.nickname : "" }}
                </div>
              </div>
            </div>
          </div>
          <Menu>
            <div>
              <!-- <i class="iconfont">&#xe6ad;</i> -->
              <van-icon size=".18rem" name="chat-o" />
              评论
            </div>
            <div>
              <van-icon size=".18rem" name="star-o" />
              <!-- <i class="iconfont">&#xe86f;</i> -->
              点赞
            </div>
            <div>
              <!-- <i class="iconfont">&#xe62d;</i> -->
              <van-icon size=".18rem" name="add-o" />
              收藏
            </div>
            <div>
              <!-- <i class="iconfont">&#xe606;</i> -->
              <van-icon size=".18rem" name="more-o" />
              更多
            </div>
          </Menu>
        </div>
        <!-- 歌曲列表 -->
        <SongList :subscribedCount="detail.playlist ? detail.playlist.subscribedCount : 0" :songs="songs.songs"></SongList>
      </div>
    </transition>
    <Loading v-show="loading"></Loading>
  </SongListStyled>
</template>

<script>
import { SongListStyled, Menu } from "./style";
import HeaderTitle from "@/packages/header/index.vue";
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { GET_DETAIL } from "@/store/modules/constant";
import Loading from "@/baseUI/loading/index.vue";
import SongList from "@/packages/songList/index.vue"
import globalStyle from "@/assets/global-style"
export default {
  components: {
    SongListStyled,
    HeaderTitle,
    Loading,
    Menu,
    SongList
  },
  setup() {
    let isMarquee = ref(false);
    let title = ref("歌单");
    let show = ref(false);
    let loading = ref(true);
    let background = ref(globalStyle["theme-color"]);
    let store = useStore();
    let headRef = ref(null)
    const route = useRoute();

    const detail = computed(() => store.getters["alDetail/detail"]);
    const songs = computed(() => store.getters["alDetail/songs"]);
    const playSwitch = computed(() => store.state.playSwitch)
    const playCounts = computed(() => {
      if (detail.value.playlist) {
        return Math.ceil(detail.value.playlist.playCount / 10000) + "万";
      } else {
        return "";
      }
    });
    const coverImgUrl = computed(() => {
      if (detail.value.playlist) {
        return detail.value.playlist.coverImgUrl;
      } else {
        return "";
      }
    });
    /**
     * 页面滚动的时间
     */
    function handleScroll(e){
      let scrollTop = e.target.scrollTop
      let minHeight = headRef.value.$el.getBoundingClientRect().height
      let percent = Math.abs(scrollTop / minHeight)
      if(scrollTop < minHeight){
        headRef.value.$el.style.background = ""
        headRef.value.$el.style.opacity = 1
        isMarquee.value = false

        }else{
          if(!isMarquee){
            isMarquee.value = true
          }
            isMarquee.value = true

          headRef.value.$el.style.background = background.value
          headRef.value.$el.style.opacity = Math.min(1, (percent - 1 ) / 2)
        }
    }
    onMounted(async () => {
      await store.dispatch({
        type: "alDetail/" + GET_DETAIL,
        id: route.params.id,
      });
      show.value = true;
      loading.value = false;
    });
    return {
      isMarquee,
      title,
      show,
      detail,
      coverImgUrl,
      background,
      loading,
      playCounts,
      songs,
      handleScroll,
      headRef,
      playSwitch
    };
  },
};
</script>

<style>
</style>