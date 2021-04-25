<template>
    <SearchContainerStyled>
        <transition  @enter="handleAnimateEnter" leave-active-class="animate__fadeOutRight animate__animated" appear="animate__animated animate__fadeInRight" enter-active-class="animate__animated animate__fadeInRight" duration="300">
            <div v-show="state.show" class="searchContainer">
                <div class="header">
                    <van-icon color="#fff" @click="handleBack" name="arrow-left" />
                    <van-search @clear="handleClear" @search="handleSearch" :background="state.themeColor" autofocus shape="round" class="searchInput" v-model="state.keywords" placeholder="搜索歌曲、歌手、专辑" />
                </div>
                <div class="content">
                <!-- 热门搜索 -->
                <div class="hotContainer" v-if="!state.listShow">
                    <div class="headTitle">热门搜索</div>
                    <ul class="hotList">
                        <li class="hotItem border" @click="handleSearch(item.first)" v-for="(item, index) in hots" :key="index"><span>{{item.first}}</span></li>
                    </ul>
                </div>
                <!-- 搜索的歌曲列表 -->
                <ScrollCom :pullUpLoad="true" @pullUpLoad="handlePullUpLoad" v-else @initRequest="handelScrollCallback" :loading="state.loading">
                    <slot>
                        <div class="searchListWrapper">
                            <div class="suggestBox" v-if="suggest.artists">
                                <h3 class="title">
                                    相关歌手
                                </h3>
                                <div class="border-bottom artistWrapper">
                                    <van-image width="0.5rem" height="0.5rem" :src="suggest.artists[0].picUrl"/>
                                    <span class="name">歌手：{{suggest.artists[0].name}}</span>
                                </div>
                            </div>
                            <ul class="songList">
                                <li class="songItem" v-for="item in searchResult.songs" :key="item.id">
                                    <span class="songName">{{item.name}}</span>
                                    <span class="songAuthor">{{songAuthor(item)}}</span>
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
import {SearchContainerStyled} from "./style"
import {reactive, onMounted, onBeforeMount, computed, onUnmounted} from "vue"
import globalStyle from "@/assets/global-style"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import {GET_HOTS, GET_SEARCH_LIST, SET_SEARCHRESULT, GET_SUGGEST, SET_SUGGEST} from "@/store/modules/constant"
import Loading from "@/baseUI/loading/index.vue"
import ScrollCom from "@/packages/scroll/index.vue"
export default {
    components: {
        SearchContainerStyled,
        Loading,
        ScrollCom
    },
    setup(){
        const router = useRouter()
        const store = useStore()
        const state = reactive({
            show: false,
            keywords: "",
            themeColor: globalStyle["theme-color"],
            listShow: false,
            loading: true,
        })
        onBeforeMount(async () => {
            await store.dispatch({
                type: 'search/' + GET_HOTS,
            })
        })
        onMounted(() => {
        })
        onUnmounted(() => {
           store.commit("search/" + SET_SEARCHRESULT, {
               hasMore: false,
               songCount: 0,
               songs: []
           })
           store.commit("search/" + SET_SUGGEST, {})
        })
        const hots = computed(() => store.state.search.hots)
        const searchResult = computed(() => store.getters["search/searchResult"])
        const page = computed(() => store.getters["search/page"])
        const suggest = computed(() => store.getters["search/suggest"])

        const songAuthor = computed(() => (item) => {
            let author = item.artists[0].name + "-" + item.album.name
            return author;
        })
        /**
         * 动画进场
         */
        function handleAnimateEnter(){
            state.show = true
        }
        /**
         * 返回
         */
        function handleBack(){
            state.show = false
            router.go(-1)
        }
        function handelScrollCallback(fn){
            fn && fn(false)
        }
        /**
         * 加载更多的函数
         */
        async function handlePullUpLoad(fn){
            if(searchResult.value.hasMore){
                state.loading = true
                await store.dispatch({
                     type: "search/" + GET_SEARCH_LIST,
                     data: {
                         keywords: state.keywords,
                         limit: 30 * page.value
                     }
                 })
                 state.loading = false
                 fn && fn()
            }
        }
        /**
         * 搜索方法
         */
       async function handleSearch(value){
           state.keywords = value;
           state.listShow = true
           state.loading = true;
           await store.dispatch({
                type: "search/" + GET_SUGGEST,
                data: {
                    keywords: state.keywords
                }
            })
           await store.dispatch({
               type: "search/" + GET_SEARCH_LIST,
               data: {
                   keywords: value,
               }
           })
           state.loading = false
        }
        
        /**
         * 点击清空方法
         */
       function handleClear(){
           state.listShow = false
           store.commit("search/" + SET_SEARCHRESULT, {
                hasMore: false,
                songCount: 0,
                songs: [],
           })
           store.commit("search/" + SET_SUGGEST, {})
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
            suggest
        }
    }
}
</script>

<style>

</style>