<template>
  <RecommendWrapper>
      <Swiper :banners="state.banners"></Swiper>
  </RecommendWrapper>
</template>

<script>
import {RecommendWrapper} from "./style"
import Swiper from "./swiper/index.vue"
import {reactive} from "vue"
import request from "@/request/http"
export default {
    components: {
        "RecommendWrapper": RecommendWrapper,
        "Swiper": Swiper
    },
    setup(){
        const state = reactive({
            banners: []
        })
        request({
            url: "/api/banner",
            method: "GET",
        }).then((res) => {

            if(res.code == 200){
                state.banners = res.banners
            }
        })
        return {
            state
        }
    }
}
</script>

<style>

</style>